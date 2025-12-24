import { beforeEach, describe, expect, test } from "vitest";
import { HexCode } from "../value-objects/HexCode";
import { Hexadle } from "./Hexadle";
import { GameOverError } from "../../errors/GameOverError";
import { HexFeedback } from "../value-objects/HexFeedback";

describe("Hexadle game", () => {
    let hexSecret: HexCode;
    let game: Hexadle;

    beforeEach(() => {
        hexSecret = new HexCode("A10");
        game = new Hexadle(hexSecret);
    });

    test("It should mark the game as solved if I guess the secret word", () => {
        game.sendAttempt(new HexCode("A10")); 
        expect(game.isSolved).toBe(true);
    })

    test("It should save the attempt in the history and deduct one life", () => {
        const failedAttempt = new HexCode("BBBB")
        game.sendAttempt(failedAttempt);
        expect(game.isSolved).toBe(false);
        expect(game.attemptsCount).toBe(1);
        expect(game.lives).toBe(4)
    })

    test("It should return the correct feedback (colors) after an attempt", () => {
        const attempt = new HexCode("AF0");
        const resultado = game.sendAttempt(attempt);

        expect(resultado).toEqual([
            HexFeedback.CORRECT,
            HexFeedback.ABSENT,
            HexFeedback.CORRECT
        ]);
    });
})