import { Static, Type } from '@sinclair/typebox';

export const AuthRequest = Type.Object({
  access_token: Type.String(),
});

export type AuthRequestType = Static<typeof AuthRequest>;
