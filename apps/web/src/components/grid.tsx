import React, { useMemo } from 'react';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  turn: number;
  feedbackHistory: string[][];
  length: number;
  cursorPos?: number;
  onCellClick?: (index: number) => void;
}

export function Grid({ guesses, currentGuess, turn, feedbackHistory, length, cursorPos, onCellClick }: GridProps) {
  const rows = Array.from({ length: 5 });

  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${length}, minmax(3.5rem, 4.5rem))`,
    gap: '0.75rem',
    justifyContent: 'center' 
  }), [length]);

  return (
      <div className="grid grid-rows-5 gap-3 mb-6 w-full max-w-2xl px-2">
        {rows.map((_, i) => {
          if (turn === i) {
            return <RowCurrent 
              key={i} 
              currentGuess={currentGuess} 
              length={length} 
              style={gridStyle}
              cursorPos={cursorPos || 0}
              onCellClick={onCellClick}
            />;
          } 
          else if (i < turn) {
            return <MemoRowCompleted 
              key={i} 
              guess={guesses[i]} 
              feedback={feedbackHistory[i]} 
              style={gridStyle} 
            />;
          } 
          else {
            return <MemoRowEmpty key={i} length={length} style={gridStyle} />;
          }
        })}
      </div>
  );
}

const MemoRowCompleted = React.memo(function RowCompleted({ guess, feedback, style }: any) {
  return (
    <div style={style}> 
      {guess.split('').map((letter: string, i: number) => {
        let bgClass = "bg-gray-700 border-gray-600";
        if (feedback[i] === 'CORRECT') bgClass = "bg-green-600 border-green-600";
        else if (feedback[i] === 'PRESENT') bgClass = "bg-yellow-600 border-yellow-600";

        return (
          <div key={i} className={`aspect-square border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase text-white ${bgClass}`}> 
            {letter}
          </div>
        );
      })}
    </div>
  );
});

const MemoRowEmpty = React.memo(function RowEmpty({ length, style }: any) {
  return (
    <div style={style}>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="aspect-square border-2 border-gray-800 flex items-center justify-center"></div>
      ))}
    </div>
  );
});

function RowCurrent({ currentGuess, length, style, cursorPos, onCellClick }: any) {
  const letters = currentGuess.split('');
  const cells = Array.from({ length });

  return (
    <div style={style}>
      {cells.map((_, i) => {
        const letter = letters[i] || "";
        const isFocused = i === cursorPos;
        let borderClass = "border-gray-500";
        if (isFocused) borderClass = "border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] scale-105 transition-transform";
        else if (letter) borderClass = "border-gray-300";

        return (
          <div 
            key={i}
            onClick={() => onCellClick && onCellClick(i)}
            className={`cursor-pointer aspect-square border-2 ${borderClass} flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase text-white select-none hover:bg-gray-800 transition-colors`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
