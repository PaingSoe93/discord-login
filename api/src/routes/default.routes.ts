import { FastifyInstance } from 'fastify';

export const defaultRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: () => {
      return { hello: 'world' };
    },
  });
};
