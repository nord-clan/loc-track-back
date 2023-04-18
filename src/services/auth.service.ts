import type { Prisma } from '@prisma/client';
import type { IUserTrack } from '#/models/user';
import type { IUserSignInInput } from '#/graphql/models/user/mutation';
import type { IUserTrackResponse } from '#/models/common';
import axios from 'axios';
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

  authWithTracker = async (payload: IUserSignInInput) => {
    const { data } = await axios.post<IUserTrackResponse>(
      'http://track.nordclan/api/v1/auth/login',
      {
        ...payload
      }
    );
    return data;
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
