import { test, expect, describe, beforeEach } from "vitest";
import { GameRepositoryMock } from "../entities/mocks/GameRepository-mock.js";
import { SubmitGuess } from "./SubmitGuess.js";
import { Hexadle } from "../entities/models/Hexadle.js";
import { HexCode } from "../entities/value-objects/HexCode.js";
import { GameNotFoundError } from "../errors/GameNotFoundError.js";

describe("Submit Guess Use Case", () => {
    let gameRepo: GameRepositoryMock;
    let submitGuess: SubmitGuess;

    beforeEach(() => {
        gameRepo = new GameRepositoryMock();
        submitGuess = new SubmitGuess(gameRepo);
    });

    test("It should process a guess, save progress and return feedback", async () => {
        const gameId = "game-123";
        const secret = new HexCode("AABBCC");
        const existingGame = new Hexadle(gameId, secret);
        
        await gameRepo.save(existingGame);

        const feedback = await submitGuess.execute(gameId, "112233");

        expect(feedback).toBeDefined();
        expect(Array.isArray(feedback)).toBe(true);
        expect(feedback.length).toBe(6);
        const updatedGame = await gameRepo.findById(gameId);
        expect(updatedGame?.attemptsCount).toBe(1);
        expect(updatedGame?.lives).toBe(4);
    });

    test("It should throw an error if the game does not exist", async () => {
        await expect(submitGuess.execute("id-falso", "000000"))
            .rejects
            .toThrow(GameNotFoundError);
    });
});