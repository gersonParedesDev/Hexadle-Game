// wordle.test.ts
import { describe, it, expect, vi } from 'vitest';
import { Wordle, Feedback } from '../src/Wordle';
import { mockDictionary, mockValidWord, mockInvalidWord, mockCorrectGuess, mockPartialGuess1, mockPartialGuess2, mockIncorrectGuess } from './mocks/words';

vi.mock('./service/dictionary', () => ({
  loadDictionary: () => mockDictionary,
}));

describe('Wordle', () => {
  it('should initialize with the correct word and dictionary', () => {
    const game = new Wordle(mockValidWord);
    expect(game).toBeDefined();
  });

  it('should return feedback for a valid word guess', () => {
    const game = new Wordle(mockValidWord);
    const feedback: Feedback[] = game.getCorrectLetter(mockCorrectGuess);

    expect(feedback).toEqual([
      { letter: 'P', status: 'correct' },
      { letter: 'E', status: 'correct' },
      { letter: 'R', status: 'correct' },
      { letter: 'A', status: 'correct' },
    ]);
  });

  it('should throw an error for an invalid word', () => {
    const game = new Wordle(mockValidWord);
    expect(() => game.getCorrectLetter(mockInvalidWord)).toThrow('La palabra ingresada no es válida.');
  });

  it('should return mixed feedback for a partially correct guess', () => {
    const game = new Wordle(mockValidWord);
    const feedback: Feedback[] = game.getCorrectLetter(mockPartialGuess1);

    expect(feedback).toEqual([
      { letter: 'S', status: 'incorrect' },
      { letter: 'A', status: 'semi-correct' },
      { letter: 'P', status: 'semi-correct' },
      { letter: 'O', status: 'incorrect' },
    ]);
  });

  it('should return mixed feedback for a partially correct guess', () => {
    const game = new Wordle(mockValidWord);
    const feedback: Feedback[] = game.getCorrectLetter(mockPartialGuess2);

    expect(feedback).toEqual([
      { letter: 'V', status: 'incorrect' },
      { letter: 'E', status: 'correct' },
      { letter: 'L', status: 'incorrect' },
      { letter: 'A', status: 'correct' },
    ]);
  });

  it('should end the game when all letters are correct', () => {
    const game = new Wordle(mockValidWord);
    game.getCorrectLetter(mockCorrectGuess);
    expect(game.isGameOver()).toBe(true);
  });


  it('should end the game after 5 attempts', () => {
    const game = new Wordle(mockValidWord);
    for (let i = 0; i < 5; i++) {
      game.getCorrectLetter(mockIncorrectGuess);
    }
    expect(game.isGameOver()).toBe(true);
  });

  it('should reset the game state', () => {
    const game = new Wordle(mockValidWord);
    game.getCorrectLetter(mockCorrectGuess);
    game.resetGame();
    expect(game.isGameOver()).toBe(false);
  });
});