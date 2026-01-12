import { SecretGenerator } from "@domain/ports/SecretGenerator.js";
import { HexCode } from "@domain/entities/value-objects/HexCode.js";

export class RandomSecretGenerator implements SecretGenerator {
    
    generate(): HexCode {
        const chars = '0123456789ABCDEF';
        let result = '';

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars.charAt(randomIndex);
        }

        return new HexCode(result);
    }
}