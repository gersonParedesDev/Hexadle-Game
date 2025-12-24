import { HexCode } from "../entities/value-objects/HexCode";
import { HexFeedback } from "../entities/value-objects/HexFeedback";


export class HexComparator {
    static compare(secret: HexCode, attempt: HexCode): HexFeedback[] {
        const feedback: HexFeedback[] = [];
        const secretValue = secret.value;
        const attemptValue = attempt.value;

        for (let i = 0; i < secretValue.length; i++) {
            if (secretValue[i] === attemptValue[i]) {
                feedback.push(HexFeedback.CORRECT);
            } else {
                feedback.push(HexFeedback.ABSENT);
            }
        }
        // falta implementar el PRESENT color amarillo
        return feedback;
    }
}