import { FastifyInstance } from 'fastify';
import { PostGameController } from '../controllers/PostGameController.js';
import { PostAttemptController } from '../controllers/PostAttemptController.js';

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.post('/games', async (request, reply) => {
    const controller = new PostGameController();
    
    await controller.run(request, reply);
  });

  fastify.post('/games/:id/attempts', async (req, reply) => {
    const controller = new PostAttemptController();
    await controller.run(req, reply);
  });
  
}