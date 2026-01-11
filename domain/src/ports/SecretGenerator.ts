import { HexCode } from "../entities/value-objects/HexCode.js"

export interface SecretGenerator {
    generate(): HexCode;
}