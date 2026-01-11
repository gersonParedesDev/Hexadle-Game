import { faker } from "@faker-js/faker";
import { SecretGenerator } from "../../ports/SecretGenerator.js";
import { HexCode } from "../value-objects/HexCode.js";

export class SecretGeneratorMock implements SecretGenerator {
    generate(): HexCode {
        const randomHex = faker.string.hexadecimal({ 
            length: 3, 
            prefix: "" 
        }).toUpperCase();

        return new HexCode(randomHex);
    }
}