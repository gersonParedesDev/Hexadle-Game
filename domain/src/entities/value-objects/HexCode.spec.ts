import { describe, test, expect } from "vitest"
import { HexCode } from "./HexCode.js";

describe("Hexcode", () => {
    test("It should throw an error if it is not of length 3 to 6", () => {
        expect(() => new HexCode('1234AF132145')).toThrow("the code must be between 3 to 6 characters");
        expect(() => new HexCode('')).toThrow("the code must be between 3 to 6 characters");
    })

    test("It should throw an error if it contains letters outside the range A-F", () => {
        expect(() => new HexCode("TYZX")).toThrow("invalid characters");
    })

    test("It should be created correctly if they are numbers", () => {
        const validHex1 = new HexCode("123456");
        const validHex2 = new HexCode("7809")
        expect(validHex1.value).toBe("123456");
        expect(validHex2.value).toBe("7809");
    });

    test("It should be created correctly if they are letters A, B, C, D, E, F", () => {
        const validHex1 = new HexCode("ABC");
        const validHex2 = new HexCode("DEF")
        expect(validHex1.value).toBe("ABC");
        expect(validHex2.value).toBe("DEF");
    });

    test("It should be created correctly with a mix of letters and numbers", () => {
        const hex = new HexCode("9AB42F")
        expect(hex.value).toBe("9AB42F")
    })

    test("It should return TRUE if two different objects have the same value", () => {
        const hex1 = new HexCode("C0FFEE");
        const hex2 = new HexCode("C0FFEE");

        expect(hex1 === hex2).toBe(false); 
        expect(hex1.equals(hex2)).toBe(true);
    });

    test("It should return FALSE if they have different values", () => {
        const hex1 = new HexCode("AAAAA");
        const hex2 = new HexCode("BBBBB");

        expect(hex1.equals(hex2)).toBe(false);
    });
});