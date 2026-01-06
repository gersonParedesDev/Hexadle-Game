import { test, expect, describe, beforeEach} from "vitest"
import { GameRepositoryMock } from "../entities/mocks/GameRepository-mock";
import { SecretGeneratorMock } from "../entities/mocks/SecretGenerator-mock";
import { StartNewGame } from "./StartNewGame";

describe("Start new game Use case", () => {
    let gameRepo: GameRepositoryMock;
    let secretGen: SecretGeneratorMock;
    let startNewGame: StartNewGame;

    beforeEach(() => {
        gameRepo = new GameRepositoryMock();
        secretGen = new SecretGeneratorMock();
        startNewGame = new StartNewGame(gameRepo, secretGen);
    });

    test("It should initialize a game correctly and return its ID", async () => {
        const gameId = await startNewGame.execute();

        expect(gameId).toBeDefined();
        expect(typeof gameId).toBe("string");
        expect(gameId.length).toBeGreaterThan(0);

        expect(gameRepo.games.length).toBe(1);

        const savedGame = await gameRepo.findById(gameId);
        expect(savedGame).toBeDefined();
        expect(savedGame?.id).toBe(gameId);
        expect(savedGame?.lives).toBe(5);
    });
})