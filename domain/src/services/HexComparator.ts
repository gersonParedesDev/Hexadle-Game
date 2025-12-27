import { HexCode } from "../entities/value-objects/HexCode";
import { HexFeedback } from "../entities/value-objects/HexFeedback";


export class HexComparator {
    static compare(secret: HexCode, attempt: HexCode): HexFeedback[] {
        const secretStr = secret.value;
        const attemptStr = attempt.value;
        const size = secretStr.length;

        const feedback: HexFeedback[] = new Array(size).fill(HexFeedback.ABSENT);

        const secretAvailableCount: Record<string, number> = {};

        for (const char of secretStr) {
            secretAvailableCount[char] = (secretAvailableCount[char] || 0) + 1;
        }

        for (let i = 0; i < size; i++) {
                if (attemptStr[i] === secretStr[i]) {
                    feedback[i] = HexFeedback.CORRECT;
                    secretAvailableCount[attemptStr[i]]--;
                }
        }

        for (let i = 0; i < size; i++) {
            if (feedback[i] === HexFeedback.CORRECT) continue;

            const letter = attemptStr[i];
            
            if (secretAvailableCount[letter] > 0) {
                feedback[i] = HexFeedback.PRESENT;
                secretAvailableCount[letter]--;
            }
        }

        return feedback;
    }
}