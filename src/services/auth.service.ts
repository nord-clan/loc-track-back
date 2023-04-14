import type { Prisma } from '@prisma/client';
import prisma from '#/prisma';
import { hashToken } from '#/graphql/utils/hash-token';

class AuthService {
  //* C
  addRefreshTokenToWhitelist = (payload: IAddRefreshTokenToWhitelistPayload) => {
    const { jti, refreshToken, userId } = payload;

    return prisma.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        userId
      }
    });
  };

  //* R

  getRefreshTokenByWhere = async <TQuery>(
    payload: IReadPayload<TQuery, Prisma.RefreshTokenWhereInput>
  ) => prisma.refreshToken.findFirstOrThrow({ ...payload.query, where: payload.where });

  getVerificationTokenByWhere = async <TQuery>(
    payload: IReadPayload<TQuery, Prisma.VerificationTokenWhereInput>
  ) => prisma.verificationToken.findFirstOrThrow({ ...payload.query, where: payload.where });

  //* U
  updateRefreshToken = async <TQuery>(payload: IUpdateRefreshTokenPayload<TQuery>) =>
    prisma.refreshToken.update({
      ...payload.query,
      where: payload.where,
      data: payload.data
    });

  //* D
}

export default AuthService;

//* ==== Interfaces ==================================================================== *//

interface IReadPayload<TQuery, TWhere> {
  query?: TQuery;
  where?: TWhere;
}

interface IAddRefreshTokenToWhitelistPayload {
  jti: string;
  refreshToken: string;
  userId: string;
}

interface IUpdateRefreshTokenPayload<TQuery> {
  query?: TQuery;
  where: Prisma.RefreshTokenWhereUniqueInput;
  data: Prisma.RefreshTokenUpdateInput;
}
