import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaGameRepository } from "../repositories/PrismaGameRepository.js";
import { StartNewGame } from "@domain/use-cases/StartNewGame.js";
import { RandomSecretGenerator } from "../services/RandomSecretGenerator.js";

export class PostGameController {
    async run(req: FastifyRequest, reply: FastifyReply){
        const repository = new PrismaGameRepository();
        const secret = new RandomSecretGenerator();
        const startGame = new StartNewGame(repository, secret);
        
        try {
            const gameId = await startGame.execute();
            return reply.status(201).send({ 
                id: gameId,
                message: 'Game started successfully' 
            });
        } catch (error) {
            console.error('Error starting game:', error);
            return reply.status(500).send({ message: 'Internal Server Error' });
        }
    
    }
}