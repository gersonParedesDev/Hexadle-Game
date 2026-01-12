import { FastifyInstance } from 'fastify';
import { PostGameController } from '../controllers/PostGameController.js';

export async function gameRoutes(fastify: FastifyInstance) {

  fastify.post('/games', async (request, reply) => {

    const controller = new PostGameController();
    
    await controller.run(request, reply);
  });
  
}