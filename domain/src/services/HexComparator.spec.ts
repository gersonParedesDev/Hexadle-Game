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
});