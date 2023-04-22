import { userRoutes, defaultRoutes } from './routes';
import { loadConfig } from './helpers/config';
import pino from 'pino';

/**
 * Run the server!
 */
const start = async () => {
  const server = await loadConfig();
  server.register(defaultRoutes);
  server.register(userRoutes, { prefix: 'user' });
  try {
    await server.listen({ port: 8000 });
    pino().info({}, 'Server listening at http://localhost:8000');
    pino().info({}, 'http://localhost:8000/docs for swagger documentation');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
