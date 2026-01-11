import { Hexadle } from "../entities/models/Hexadle.js";

export interface GameRepository {
    save(game: Hexadle): Promise<void>;
    findById(id: string): Promise<Hexadle | null>;
}