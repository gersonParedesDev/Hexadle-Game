import { SecretGenerator } from "@domain/ports/SecretGenerator.js";
import { HexCode } from "@domain/entities/value-objects/HexCode.js";

export class RandomSecretGenerator implements SecretGenerator {

    generate(): HexCode {
        const chars = '0123456789ABCDEF';
        const min = 2;
        const max = 6;
        
        const length = Math.floor(Math.random() * (max - min + 1)) + min;
        
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars.charAt(randomIndex);
        }

        return new HexCode(result);
    }
}