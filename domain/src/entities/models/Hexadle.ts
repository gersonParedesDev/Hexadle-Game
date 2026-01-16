import { GameOverError } from "../../errors/GameOverError.js";
import { HexComparator } from "../../services/HexComparator.js";
import { GameStatus } from "../value-objects/GameStatus.js";
import { HexCode } from "../value-objects/HexCode.js";
import { HexFeedback } from "../value-objects/HexFeedback.js";


export class Hexadle{
    private readonly _id: string;
    private _status: GameStatus;
    private static readonly MAX_LIVES = 5;
    private readonly _hexSecret: HexCode;
    private attempts: HexCode[];

    constructor(id: string, secret: HexCode){
        this._id = id;
        this._status = GameStatus.PLAYING;
        this._hexSecret = secret;
        this.attempts = []
    }

    get id(): string { return this._id; }
    get hexSecret(): string { return this._hexSecret.value; }
    get status(): GameStatus { return this._status; }
    get attemptsCount(): number { return this.attempts.length; }
    get lives(): number { return Hexadle.MAX_LIVES - this.attempts.length; }
    get attemptsHistory(): HexCode[] { return [...this.attempts]; }

    sendAttempt(attempt: HexCode): HexFeedback[] {
        if (this._status !== GameStatus.PLAYING) {
            throw new GameOverError();
        }

        const feedback = HexComparator.compare(this._hexSecret, attempt);

        if (this._hexSecret.equals(attempt)) {
            this._status = GameStatus.WON;
        } else {
            
            this.attempts.push(attempt);
            
            if (this.lives === 0) {
                this._status = GameStatus.LOST;
            }
        }
        return feedback;
    }

    static restore(
        id: string,
        secret: HexCode,
        attempts: HexCode[],
        status: GameStatus,
    ): Hexadle {
        const game = new Hexadle(id, secret);
        game._status = status;
        game.attempts = attempts;
        return game;
    }

}