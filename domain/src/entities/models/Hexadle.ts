import { GameOverError } from "../../errors/GameOverError";
import { HexComparator } from "../../services/HexComparator";
import { HexCode } from "../value-objects/HexCode";
import { HexFeedback } from "../value-objects/HexFeedback";


export class Hexadle{
    private _isSolved: boolean;
    private static readonly MAX_LIVES = 5;
    private readonly hexSecret: HexCode;
    private attempts: HexCode[];

    constructor(secret: HexCode){;
        this._isSolved = false;
        this.hexSecret = secret;
        this.attempts = []
    }

    get isSolved(): boolean { return this._isSolved; }
    get attemptsCount(): number { return this.attempts.length; }
    get lives(): number { return Hexadle.MAX_LIVES - this.attempts.length; }

    sendAttempt(attempt: HexCode): HexFeedback[] {
        const feedback = HexComparator.compare(this.hexSecret, attempt);

        if (this.lives === 0) {
            throw new GameOverError();
        }
        if(this.hexSecret.equals(attempt)){
            this._isSolved = true;
        }

        this.attempts.push(attempt);
        return feedback;
    }

}