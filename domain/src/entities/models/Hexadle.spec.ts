import { beforeEach, describe, expect, test } from "vitest";
import { HexCode } from "../value-objects/HexCode";
import { Hexadle } from "./Hexadle";
import { GameStatus } from "../value-objects/GameStatus";
import { GameOverError } from "../../errors/GameOverError";
import { HexFeedback } from "../value-objects/HexFeedback";

describe("Hexadle game", () => {
    let hexSecret: HexCode;
    let game: Hexadle;

    beforeEach(() => {
        hexSecret = new HexCode("A10");
        game = new Hexadle(hexSecret);
    });

    test("deberia guardar el intento en el historial y descontar una vida", () => {
        const failedAttempt = new HexCode("BBBB")
        game.sendAttempt(failedAttempt);
        expect(game.status).toBe(GameStatus.PLAYING);
        expect(game.attemptsCount).toBe(1);
        expect(game.lives).toBe(4)
    })

    test("deberia lanzar un error (Game Over) si intento jugar sin vidas", () => {
        const failedAttempt = new HexCode("AAAAA");

        for (let i = 0; i < 5; i++) {
            game.sendAttempt(failedAttempt);
        }
        expect(game.lives).toBe(0);
        expect(game.status).toBe(GameStatus.LOST);
        expect(() => { game.sendAttempt(failedAttempt)}).toThrow(GameOverError);
    });

    test("It should return the correct feedback (colors) after an attempt", () => {
        const secreto = new HexCode("A10"); 
        const game = new Hexadle(secreto);
        const attempt = new HexCode("AF0");

        const resultado = game.sendAttempt(attempt);
        expect(resultado).toEqual([
            HexFeedback.CORRECT,
            HexFeedback.ABSENT,
            HexFeedback.CORRECT
        ]);
        

        expect(game.lives).toBe(4);
    });

    test("deberia marcar el juego como GANADOR si el intento es igual al secreto", () => {
        const secreto = new HexCode("C0FFEE");
        const game = new Hexadle(secreto);
        const intentoGanador = new HexCode("C0FFEE");

        const feedback = game.sendAttempt(intentoGanador);

        expect(game.status).toBe(GameStatus.WON);
        expect(feedback.every(f => f === HexFeedback.CORRECT)).toBe(true);
    });

})