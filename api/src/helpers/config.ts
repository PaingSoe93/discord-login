import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  fastify,
} from "fastify";
import pino from "pino";
import dotenv from "dotenv";
import {} from "@fastify/jwt";
import {} from "fastify-supabase";
import {} from "@fastify/swagger";
import {} from "@fastify/swagger-ui";
import { authenticate } from "./auth.middleware";

const startServer = () => {
  dotenv.config();
  const server = fastify({
    logger: pino({ level: "info" }),
  });
  server.register(require("@fastify/cors"));
  server.register(require("@fastify/helmet"), {
    global: true,
  });
  server.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
  });
  server.addHook("onRequest", authenticate);
  return server;
};
const connectSupaBase = async (server: FastifyInstance) => {
  server.register(require("fastify-supabase"), {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
  });
};

const setUpSwagger = async (server: FastifyInstance) => {
  await server.register(require("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      host: "localhost:8000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        Authorization: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
  });
  await server.register(require("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: any
      ) {
        next();
      },
      preHandler: function (
        request: FastifyRequest,
        reply: FastifyReply,
        next: any
      ) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (
      swaggerObject: any,
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};

export const loadConfig = async () => {
  const server = startServer();
  connectSupaBase(server);
  await setUpSwagger(server);
  return server;
};
