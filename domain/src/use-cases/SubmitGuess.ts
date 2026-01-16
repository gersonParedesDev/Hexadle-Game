import { GameRepository } from "../ports/GameRepository.js";
import { HexCode } from "../entities/value-objects/HexCode.js";
import { HexFeedback } from "../entities/value-objects/HexFeedback.js";
import { GameNotFoundError } from "../errors/GameNotFoundError.js";

export class SubmitGuess {
    constructor(private readonly repository: GameRepository) {}

    async execute(gameId: string, guessStr: string): Promise<HexFeedback[]> {
        const game = await this.repository.findById(gameId);
        if (!game) {
            throw new GameNotFoundError();
        }
        const attempt = new HexCode(guessStr);
        const feedback = game.sendAttempt(attempt);
        await this.repository.save(game);

        return feedback;
    }
}