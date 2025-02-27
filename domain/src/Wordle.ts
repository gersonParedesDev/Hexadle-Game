import { loadDictionary } from "../service/dictionary"; 

export interface Feedback {
    letter: string;
    status: 'correct' | 'semi-correct' | 'incorrect';
}

export class Wordle {
    private word: string;
    private attempts: number;
    private correctLetter: number[];
    private validWords: Set<string>;

    public constructor(word: string) {
        this.word = word;
        this.attempts = 0;
        this.correctLetter = new Array(word.length).fill(0);
        this.validWords = loadDictionary();
    }

    private isValidWord(word: string): boolean {
        return this.validWords.has(word.toUpperCase());
    }

    public getCorrectLetter(wordInput: string): Feedback[] {

        if (!this.isValidWord(wordInput)) {
            throw new Error('La palabra ingresada no es válida.');
        }
        
        this.attempts += 1;
        const wordInputArr: string[] = wordInput.split("");
        const wordArr: string[] = this.word.split("");
        const feedback: Feedback[] = [];

        wordInputArr.forEach((letter, index) => {
            if (wordArr.includes(letter)) {
                if (wordArr[index] === letter) {
                    this.correctLetter[index] = 2;
                    feedback.push({ letter, status: 'correct' });
                } else {
                    this.correctLetter[index] = 1;
                    feedback.push({ letter, status: 'semi-correct' });
                }
            } else {
                this.correctLetter[index] = 0;
                feedback.push({ letter, status: 'incorrect' });
            }
        });

        return feedback;
    }

    public isGameOver(): boolean {
        return this.attempts === 5 || this.correctLetter.every((val) => val === 2);
    }

    public resetGame(): void {
        this.attempts = 0;
        this.correctLetter = new Array(this.word.length).fill(0);
    }
}