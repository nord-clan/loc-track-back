/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import type { IUser } from '../../../models/user';
import type { Prisma } from '@prisma/client';
import { generateTokens, secrets } from '../../utils/jwt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import { builder } from '#/graphql/builder';
import UserService from '#/services/user.service';
import AuthService from '#/services/auth.service';
import { hashToken } from '#/graphql/utils/hash-token';
import prisma from '#/prisma';

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
      const { user } = await authService.authWithTracker(args.data);

      const userRaw = {
        login: args.data.login,
        password: args.data.password, // TODO refactoring raw password !?
        //
        city: user.city,
        firstName: user.firstNameRu,
        lastName: user.lastNameRu,
        telegram: user.telegram,
        mobile: user.mobile,
        emailPersonal: user.emailPrimary,
        emailSecondary: user.emailSecondary
      } as unknown as IUser;

      const upsertedData = (await prisma.user.upsert({
        create: {
          ...(userRaw as unknown as Prisma.UserCreateInput),
          avatar: faker.image.abstract(500, 500, true),
          country: faker.address.country(),
          status: faker.lorem.lines(),
          birthDate: new Date(user.birthDate),
          employmentDate: new Date(user.employmentDate),
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(),
          role: user?.globalRole === 'USER' ? 'User' : 'Admin'
        },
        update: { ...(userRaw as unknown as Prisma.UserUpdateInput) },
        where: { login: userRaw.login }
      })) as unknown as IUser;

      const jti = uuid();
      const { accessToken, refreshToken } = generateTokens(upsertedData, jti);

      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: upsertedData.id
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
      const user = (await service.getByWhere({ where: { id: payload.userId } })) as IUser | null;
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
