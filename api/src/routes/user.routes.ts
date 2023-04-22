import { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import { AuthRequest, AuthRequestType, User, UserType } from '../schema';
import { authenticate } from '../helpers/auth.middleware';
import { Type } from '@sinclair/typebox';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.route<{ Body: AuthRequestType }>({
    method: 'POST',
    url: '/auth/discord',
    schema: {
      body: AuthRequest,
      response: {
        200: AuthRequest,
      },
      tags: ['User'],
    },
    handler: controllers.Auth(fastify),
  });

  fastify.route({
    method: 'GET',
    url: '/users',
    preHandler: authenticate,
    schema: {
      response: {
        200: Type.Array(User),
      },
      tags: ['User'],
      security: [
        {
          Authorization: [],
        },
      ],
    },
    handler: controllers.getUsers(fastify),
  });
};
