/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { generateTokens, secrets } from '../../utils/jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { builder } from '#/graphql/builder';
import UserService from '#/services/user.service';
import AuthService from '#/services/auth.service';
import { hashToken } from '#/graphql/utils/hash-token';

const service = new UserService();
const authService = new AuthService();

//* ==== SignUp User ==================================================== *//
export interface IUserSignUpInput {
  login: string;
  password: string;
}

const UserSignUpInput = builder.inputRef<IUserSignUpInput>('UserSignUpInput').implement({
  fields: (t) => ({
    login: t.string({ required: true }),
    password: t.string({ required: true })
  })
});

builder.mutationField('signUp', (t) =>
  t.prismaField({
    description: '-',
    type: 'User',
    args: { data: t.arg({ type: UserSignUpInput, required: true }) },
    errors: { types: [Error] },
    resolve: async (query, root, args, ctx, info) => {
      //* if user already exists throw error
      const existing = await service.getByWhere({ query, where: { login: args.data.login } });
      if (existing) {
        throw new Error('User already exists please signIn');
      }
      return service.post(args.data);
    }
  })
);

//* ==== SignIn User ==================================================== *//
export interface IUserSignInInput {
  login: string;
  password: string;
}

const UserSignInInput = builder.inputRef<IUserSignInInput>('UserSignInInput').implement({
  fields: (t) => ({
    login: t.string({ required: true }),
    password: t.string({ required: true })
  })
});

class Token {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

const UserSignInPayload = builder.objectType(Token, {
  name: 'UserSignInPayload',
  fields: (t) => ({
    accessToken: t.exposeString('accessToken'),
    refreshToken: t.exposeString('refreshToken')
  })
});

builder.mutationField('signIn', (t) =>
  t.field({
    description: 'Sign in',
    type: UserSignInPayload,
    errors: { types: [Error] },
    args: { data: t.arg({ type: UserSignInInput, required: true }) },
    resolve: async (root, args, ctx, info) => {
      const existing = await service.getByWhere({ where: { login: args.data.login } });
      if (!existing) {
        throw new Error('No user found');
      }
      const validPassword = await bcrypt.compare(args.data.password, existing.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const jti = uuid();
      const { accessToken, refreshToken } = generateTokens(existing, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existing.id
      });

      return {
        accessToken,
        refreshToken
      };
    }
  })
);

//* ==== Refresh token ================================================== *//
builder.mutationField('refreshToken', (t) =>
  t.field({
    description: 'Refreshes the access token',
    type: UserSignInPayload,
    errors: { types: [Error] },
    args: {
      refreshToken: t.arg({
        type: 'String',
        required: true
      })
    },
    resolve: async (root, args, ctx) => {
      const payload = jwt.verify(args.refreshToken, secrets.JWT_REFRESH_SECRET) as jwt.JwtPayload;
      const savedRefreshToken = await authService.getRefreshTokenByWhere({
        where: { id: payload?.jti as string }
      });
      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        throw new Error('Unauthorized');
      }
      const hashedToken = hashToken(args.refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        throw new Error('Unauthorized');
      }
      const user = await service.getByWhere({ where: { id: payload.userId } });
      if (!user) {
        throw new Error('Unauthorized');
      }
      await authService.updateRefreshToken({
        where: { id: savedRefreshToken.id },
        data: {
          revoked: true
        }
      });

      const jti = uuid();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: user.id
      });

      return {
        accessToken,
        refreshToken
      };
    }
  })
);

//* ==== Reset password ================================================= *//
builder.mutationField('resetPassword', (t) =>
  t.prismaField({
    description: 'Reset password',
    type: 'User',
    errors: { types: [Error] },
    args: {
      token: t.arg.string({ required: true }),
      password: t.arg.string({ required: true })
    },
    resolve: async (query, root, args, ctx, info) => {
      const payload = jwt.verify(args.token, secrets.JWT_PASSWORD_RESET_SECRET) as jwt.JwtPayload;
      const savedToken = await authService.getVerificationTokenByWhere({
        where: { id: payload?.jti }
      });
      if (!savedToken || savedToken.revoked === true) {
        throw new Error('Invalid token');
      }
      const user = await service.getByWhere({ where: { id: payload.userId } });
      if (!user) {
        throw new Error('Invalid token');
      }
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const updatedUser = await service.update({
        query,
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      await authService.updateRefreshToken({
        where: { id: savedToken.id },
        data: {
          revoked: true
        }
      });

      return updatedUser;
    }
  })
);
