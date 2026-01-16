import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaGameRepository } from '../../repositories/PrismaGameRepository.js';
import { SubmitGuess } from '@domain/use-cases/SubmitGuess.js';
import { GameNotFoundError } from '@domain/errors/GameNotFoundError.js';

export class PostAttemptController {
    async run(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string };

        if (!req.body) {
             return reply.status(400).send({ error: 'Missing request body' });
        }
        
        const { guess } = req.body as { guess: string };

        if (!guess) {
            return reply.status(400).send({ error: 'Guess is required' });
        }
        const repository = new PrismaGameRepository();
        const useCase = new SubmitGuess(repository);

        try {
            const feedback = await useCase.execute(id, guess);
            return reply.status(200).send({ feedback });

        } catch (error) {
            if (error instanceof GameNotFoundError) {
                return reply.status(404).send({ error: 'Game not found' });
            }

            if (error instanceof Error && error.message.includes('Invalid Hex')) {
                return reply.status(400).send({ error: error.message });
            }

            console.error(error);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}