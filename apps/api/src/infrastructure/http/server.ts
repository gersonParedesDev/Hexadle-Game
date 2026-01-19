import Fastify from 'fastify';
import cors from '@fastify/cors';
import { gameRoutes } from './routes/gameRoutes.js';

const server = Fastify({
  logger: true
});

await server.register(cors, {
  origin: true
});

server.register(gameRoutes);

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();