import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BAD_REQUEST } from "../helpers/error.constant";
import { AuthRequestType } from "../schema";

export const getUsers = async function (
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { supabase } = this;
  return (await supabase.from("users").select()).data;
};

export const Auth = async function (
  this: FastifyInstance,
  request: FastifyRequest<{ Body: AuthRequestType }>,
  reply: FastifyReply
) {
  const { supabase } = this;
  const user = await supabase.auth.api.getUser(request.body.access_token);
  if (!user.data)
    reply
      .code(BAD_REQUEST.statusCode)
      .send({ ...BAD_REQUEST, message: "access_token is invalid" });
  const res = await supabase.from("users").upsert({
    id: user.data?.id,
    email: user.data?.email,
    last_login_at: new Date(),
  });
  return {
    access_token: this.jwt.sign({
      id: user.data?.id,
    }),
  };
};
