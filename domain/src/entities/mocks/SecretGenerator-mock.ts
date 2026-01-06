import { SecretGenerator } from "../../ports/SecretGenerator";
import { HexCode } from "../value-objects/HexCode";
import { faker } from "@faker-js/faker";

export class SecretGeneratorMock implements SecretGenerator {
    generate(): HexCode {
        const randomHex = faker.string.hexadecimal({ 
            length: 3, 
            prefix: "" 
        }).toUpperCase();

        return new HexCode(randomHex);
    }
}