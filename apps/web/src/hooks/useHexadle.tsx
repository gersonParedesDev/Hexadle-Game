import { useState, useEffect, useCallback } from 'react';
import { gameService } from '../services/game.service';

type GameStatus = 'PLAYING' | 'WON' | 'LOST';

export function useHexadle() {
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState<string[][]>([]);

  const [cursorPos, setCursorPos] = useState(0);

  const [gameId, setGameId] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('PLAYING');
  const [secretCode, setSecretCode] = useState("");
  const [secretLength, setSecretLength] = useState(0);
  const [targetNumber, setTargetNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    setIsLoading(true);
    try {
      const { id, length, target} = await gameService.startGame();
      console.log(`Init game ID: ${id}, Length: ${length}`);
      
      setGameId(id);
      setSecretLength(length);
      setTargetNumber(target);
      
      setTurn(0);
      setGuesses([]);
      setFeedbackHistory([]);
      setGameStatus('PLAYING');
      setCurrentGuess("");
      setSecretCode(""); 
      setCursorPos(0);
    } catch (error) {
      console.error("Error starting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCellClick = useCallback((index: number) => {
    if (gameStatus !== 'PLAYING') return;
    const newPos = Math.min(index, currentGuess.length);
    setCursorPos(newPos);
  }, [gameStatus, currentGuess.length]);


  const handleChar = useCallback((char: string) => {
    if (gameStatus !== 'PLAYING') return;
    const upperChar = char.toUpperCase();
    
    setCurrentGuess(prev => {
      if (prev.length >= secretLength && cursorPos >= secretLength) return prev;

      const chars = prev.split('');
      chars[cursorPos] = upperChar;
      return chars.join('');
    });

    setCursorPos(prev => Math.min(prev + 1, secretLength));

  }, [gameStatus, secretLength, cursorPos]);

  const handleDelete = useCallback(() => {
    if (gameStatus !== 'PLAYING') return;
    
    if (cursorPos > 0) {
      setCurrentGuess(prev => {
        const chars = prev.split('');
        chars.splice(cursorPos - 1, 1); 
        return chars.join('');
      });

      setCursorPos(prev => Math.max(0, prev - 1));
    }
  }, [gameStatus, cursorPos]);

  const handleArrow = useCallback((direction: 'left' | 'right') => {
    if (gameStatus !== 'PLAYING') return;

    setCursorPos(prev => {
      if (direction === 'left') return Math.max(0, prev - 1);
      return Math.min(prev + 1, currentGuess.length);
    });
  }, [gameStatus, currentGuess.length]);

  const handleEnter = useCallback(async () => {
    if (gameStatus !== 'PLAYING') return;
    
    if (currentGuess.length !== secretLength || !gameId) return;

    try {
      const response = await gameService.submitGuess(gameId, currentGuess);
      const feedback = response.feedback;

      setGuesses(prev => [...prev, currentGuess]);
      setFeedbackHistory(prev => [...prev, feedback]);
      
      const isWin = feedback.every((f: string) => f === 'CORRECT');

      if (isWin) {
        setGameStatus('WON');
        setSecretCode(currentGuess);
      } else if (response.status === 'LOST' || response.solution) {
         setGameStatus('LOST');
         setSecretCode(response.solution);
      }
      else if (turn >= 4) { 
        setGameStatus('LOST');
        setSecretCode(response.solution || "??????"); 
      } else {
        setTurn(prev => prev + 1);
        setCurrentGuess("");
        setCursorPos(0); 
      }

    } catch (error) {
      console.error("Error enviando intento:", error);
      if (turn >= 5) { 
          setGameStatus('LOST');
          setSecretCode("??????"); 
      }
    }
  }, [gameStatus, currentGuess, gameId, turn, secretLength]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (key === 'ENTER') handleEnter();
      else if (key === 'BACKSPACE') handleDelete();
      else if (key === 'ARROWLEFT') handleArrow('left');
      else if (key === 'ARROWRIGHT') handleArrow('right');
      else {
        if (/^[0-9A-F]$/.test(key)) handleChar(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter, handleDelete, handleChar, handleArrow]);

  return {
    turn,
    guesses,
    currentGuess,
    gameStatus,
    secretCode,
    feedbackHistory,
    secretLength,
    cursorPos,
    targetNumber,
    handleChar,
    handleDelete,
    handleEnter,
    handleCellClick,
    isLoading,
  };
}