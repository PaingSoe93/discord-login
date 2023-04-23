import { FastifyInstance } from "fastify";
import { UserController } from "../controllers";
import { AuthRequest, AuthRequestType, User } from "../schema";
import { Type } from "@sinclair/typebox";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.decorateRequest("protected", "hello");
  fastify.route({
    method: "GET",
    url: "/users",
    schema: {
      response: {
        200: Type.Array(User),
      },
      tags: ["User"],
      security: [
        {
          Authorization: [],
        },
      ],
    },
    handler: UserController.getUsers,
  });
};

export const userAuthRoutes = async (fastify: FastifyInstance) => {
  fastify.route<{ Body: AuthRequestType }>({
    method: "POST",
    url: "/auth/discord",
    schema: {
      body: AuthRequest,
      response: {
        200: AuthRequest,
      },
      tags: ["User"],
    },
    handler: UserController.Auth,
  });
};
