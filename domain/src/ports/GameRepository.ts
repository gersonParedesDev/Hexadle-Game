import { Hexadle } from "../entities/models/Hexadle";

export interface GameRepository {
    save(game: Hexadle): Promise<void>;
    findById(id: string): Promise<Hexadle | null>;
}