import jwt from 'jsonwebtoken';

export const AUTH_SECRET = process.env.AUTH_SECRET as string;

export const secrets = {
  JWT_ACCESS_SECRET: `${AUTH_SECRET}access`,
  JWT_REFRESH_SECRET: `${AUTH_SECRET}refresh`,
  JWT_VERIFICATION_SECRET: `${AUTH_SECRET}verification`,
  JWT_PASSWORD_RESET_SECRET: `${AUTH_SECRET}password-reset`
};

export const generateAccessToken = (user: { id: string }) =>
  jwt.sign({ userId: user.id }, secrets.JWT_ACCESS_SECRET as string, {
    expiresIn: '2h'
  });

export const generateRefreshToken = (user: { id: string }, jti: string) =>
  jwt.sign(
    {
      userId: user.id,
      jti
    },
    secrets.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '7d'
    }
  );

export const generateTokens = (user: { id: string }, jti: string) => ({
  accessToken: generateAccessToken(user),
  refreshToken: generateRefreshToken(user, jti)
});
