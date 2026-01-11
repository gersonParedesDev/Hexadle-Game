import { GameRepository } from "../../ports/GameRepository.js";
import { Hexadle } from "../models/Hexadle.js";

export class GameRepositoryMock implements GameRepository {
    public games: Hexadle[] = []; 

    async save(game: Hexadle): Promise<void> {
        this.games.push(game);
    }

    async findById(id: string): Promise<Hexadle | null> {
        return this.games.find(g => (g as any).id === id) || null;
    }
}