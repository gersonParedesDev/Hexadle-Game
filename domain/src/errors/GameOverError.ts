export class GameOverError extends Error {
    constructor() {
        super("Game over: You have no lives left");
        this.name = "GameOverError";
    }
}