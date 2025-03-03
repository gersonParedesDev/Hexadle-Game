import React from 'react';

interface GameBoardProps {
    rows: string[][];
    updateLetter: (rowIndex: number, letterIndex: number, letter: string) => void;
  }
  
  const onSubmit = () => {
    
  }

  const GameBoard: React.FC<GameBoardProps> = ({ rows, updateLetter }) => {
    return (
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((letter, letterIndex) => (
              <input
                key={letterIndex}
                value={letter}
                onChange={(e) => {
                  const newValue = e.target.value.toUpperCase().slice(0, 1);
                  updateLetter(rowIndex, letterIndex, newValue);
  
                  if (newValue && letterIndex < row.length - 1) {
                    document.getElementById(`input-${rowIndex}-${letterIndex + 1}`)?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !letter && letterIndex > 0) {
                    document.getElementById(`input-${rowIndex}-${letterIndex - 1}`)?.focus();
                  }
                }}
                id={`input-${rowIndex}-${letterIndex}`}
                maxLength={1}
                className="w-16 h-16 bg-gray-950 border-2 border-gray-600 rounded-sm 
                          flex items-center justify-center cursor-pointer
                          text-white font-extrabold text-2xl text-center focus:outline-none 
                          focus:border-blue-500 caret-transparent"
              />
            ))}
          </div>
        ))}
      </form>
    );
  };
  
  export default GameBoard;