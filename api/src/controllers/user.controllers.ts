import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { AuthRequestType, User, UserType } from '../schema';
import { BAD_REQUEST } from '../helpers/error.constant';

export const Auth =
  (fastify: FastifyInstance) =>
  async (
    request: FastifyRequest<{ Body: AuthRequestType }>,
    reply: FastifyReply
  ) => {
    const { supabase } = fastify;
    const user = await supabase.auth.api.getUser(request.body.access_token);
    if (!user.data)
      reply
        .code(BAD_REQUEST.statusCode)
        .send({ ...BAD_REQUEST, message: 'access_token is invalid' });
    const res = await supabase.from('users').upsert({
      id: user.data?.id,
      email: user.data?.email,
      last_login_at: new Date(),
    });
    return {
      access_token: fastify.jwt.sign({
        id: user.data?.id,
      }),
    };
  };

export const getUsers =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { supabase } = fastify;
    return (await supabase.from('users').select()).data;
  };
