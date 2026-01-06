import { Hexadle } from "../entities/models/Hexadle";
import { randomUUID } from "crypto";
import { GameRepository } from "../ports/GameRepository";
import { SecretGenerator } from "../ports/SecretGenerator";

export class StartNewGame {
    constructor(
        private readonly repository: GameRepository,
        private readonly secretGenerator: SecretGenerator
    ) {}

    async execute(): Promise<string> {
        const gameId = randomUUID();
        const secret = this.secretGenerator.generate();

        const newGame = new Hexadle(gameId, secret);
        await this.repository.save(newGame);

        return newGame.id;
    }
}