import { Static, Type } from "@sinclair/typebox";

export const User = Type.Object({
  id: Type.String(),
  email: Type.String(),
  last_login_at: Type.Unsafe<Date>({ type: "string", format: "date-time" }),
});

export type UserType = Static<typeof User>;
