import { describe, test, expect } from "vitest";
import { HexComparator } from "./HexComparator";
import { HexCode } from "../entities/value-objects/HexCode";
import { HexFeedback } from "../entities/value-objects/HexFeedback";

describe("HexComparator Service", () => {
    test("It should return CORRECT (Green) for exact matches", () => {
        const secret = new HexCode("A12");
        const attempt = new HexCode("AF2");
        const result = HexComparator.compare(secret, attempt);

        expect(result).toEqual([
            HexFeedback.CORRECT,
            HexFeedback.ABSENT,
            HexFeedback.CORRECT
        ]);
    });
    test("It should return PRESENT (Yellow) for characters that exist but are in wrong position", () => {
        const secret = new HexCode("123");
        const attempt = new HexCode("312");
        const result = HexComparator.compare(secret, attempt);

        expect(result).toEqual([
            HexFeedback.PRESENT,
            HexFeedback.PRESENT,
            HexFeedback.PRESENT
        ])
    })

    test("It should handle duplicates correctly (only mark PRESENT if strictly needed)", () => {
    const secret = new HexCode("A12");
    const attempt = new HexCode("AAA");
    const result = HexComparator.compare(secret, attempt);

    expect(result).toEqual([
        HexFeedback.CORRECT,
        HexFeedback.ABSENT,
        HexFeedback.ABSENT
    ]);
});
});