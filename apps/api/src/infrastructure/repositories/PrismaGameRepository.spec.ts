import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { PrismaGameRepository } from "./PrismaGameRepository.js";
import { PrismaClient } from "@prisma/client";
import { HexCode } from "@domain/entities/value-objects/HexCode.js";
import { Hexadle } from "@domain/entities/models/Hexadle.js";

const prisma = new PrismaClient();
const repository = new PrismaGameRepository();


describe("PrismaGameRepository (Integration)", () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    test("deberia guardar un juego y luego encontrarlo por su ID", async () => {
        const id = "test-game-id" + Date.now();
        const secret = new HexCode("A1B2C3");

        const newGame = new Hexadle(id, secret);

        await repository.save(newGame);

        const foundGame = await repository.findById(id);

        expect(foundGame).toBeDefined();
        expect(foundGame?.id).toBe(id);
        expect(foundGame?.hexSecret).toBe("A1B2C3");
        expect(foundGame).toBeInstanceOf(Hexadle);
    })
})