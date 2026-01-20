import { Hexadle } from "../entities/models/Hexadle.js";
import { randomUUID } from "crypto";
import { GameRepository } from "../ports/GameRepository.js";
import { SecretGenerator } from "../ports/SecretGenerator.js";

export interface StartGameOutput {
    id: string;
    length: number;
    decimalValue: string; 
}

export class StartNewGame {
    constructor(
        private readonly repository: GameRepository,
        private readonly secretGenerator: SecretGenerator
    ) {}

    async execute(): Promise<StartGameOutput> {
        const gameId = randomUUID();
        const secret = this.secretGenerator.generate();

        const decimalValue = parseInt(secret.value, 16).toString();

        const newGame = new Hexadle(gameId, secret);
        await this.repository.save(newGame);

        return {
            id: newGame.id,
            length: secret.value.length,
            decimalValue: decimalValue
        };
    }
}