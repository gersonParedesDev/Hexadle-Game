import { HexCode } from "../entities/value-objects/HexCode"

export interface SecretGenerator {
    generate(): HexCode;
}