import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
export const authenticate = async function (
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const a = this.hasRequestDecorator("protected");
    if (a) await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};
