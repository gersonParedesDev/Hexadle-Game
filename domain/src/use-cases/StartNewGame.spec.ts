import { test, expect, describe, beforeEach } from "vitest";
import { GameRepositoryMock } from "../entities/mocks/GameRepository-mock.js";
import { SecretGeneratorMock } from "../entities/mocks/SecretGenerator-mock.js";
import { StartNewGame } from "./StartNewGame.js";

describe("Start new game Use case", () => {
    let gameRepo: GameRepositoryMock;
    let secretGen: SecretGeneratorMock;
    let startNewGame: StartNewGame;

    beforeEach(() => {
        gameRepo = new GameRepositoryMock();
        secretGen = new SecretGeneratorMock();
        startNewGame = new StartNewGame(gameRepo, secretGen);
    });

    test("It should initialize a game correctly and return its ID and length", async () => {
        const { id, length, decimalValue } = await startNewGame.execute();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id.length).toBeGreaterThan(0);

        expect(length).toBeDefined();
        expect(typeof length).toBe("number");
        expect(length).toBeGreaterThanOrEqual(3);
        expect(length).toBeLessThanOrEqual(6);

        expect(decimalValue).toBeDefined();
        expect(typeof decimalValue).toBe("string");

        expect(gameRepo.games.length).toBe(1);

        const savedGame = await gameRepo.findById(id);
        
        expect(savedGame).toBeDefined();
        expect(savedGame?.id).toBe(id);
        expect(savedGame?.lives).toBe(5); 
    });
});