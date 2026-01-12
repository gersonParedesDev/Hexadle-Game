import { Hexadle } from "@domain/entities/models/Hexadle.js";
import { GameRepository } from "@domain/ports/GameRepository.js";
import { HexCode } from "@domain/entities/value-objects/HexCode.js";
import { GameStatus } from "@domain/entities/value-objects/GameStatus.js";
import { prisma } from "../db/prisma.js";

export class PrismaGameRepository implements GameRepository{
    async save(game: Hexadle): Promise<void> {
        const dataToSave = {
            id: game.id,
            secret: game.hexSecret,
            lives: game.lives,
            attempts: game.attemptsHistory.map(a => a.value),
            status: game.status,
        }
        await prisma.gameModel.upsert({
            where: { id: game.id },
            update: dataToSave,
            create: dataToSave,
        });
    }
    async findById(id: string): Promise<Hexadle | null> {
        const rawGame = await prisma.gameModel.findUnique({
            where: { id },
        });
        if (!rawGame) return null;

        const secret = new HexCode(rawGame.secret);
        const attempts = rawGame.attempts.map((hexStr: string) => new HexCode(hexStr))
        const status = rawGame.status as GameStatus;

        return Hexadle.restore(
            rawGame.id,
            secret,
            attempts,
            status
        );
    }
}