import { Header } from './components/header';
import { Grid } from './components/grid';
import { Keyboard } from './components/keyboard';
import { Modal } from './components/modals/modal';
import { useHexadle } from './hooks/useHexadle';
import { useState } from 'react';
import { HelpModal } from './components/modals/helpModal';
import { TipModal } from './components/modals/tipModal';

function App() {
  const { 
    turn, 
    guesses, 
    currentGuess, 
    feedbackHistory,
    handleChar,
    handleDelete, 
    handleEnter,
    gameStatus,
    secretCode,
    secretLength,
    cursorPos,
    isLoading,
    handleCellClick,
    targetNumber
  } = useHexadle();

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-xl font-mono text-purple-400">
          CONNECT...
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center relative font-sans">
      <Header 
        length={secretLength}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenTip={() => setIsTipOpen(true)}
      />

      <main className="flex-grow flex flex-col items-center w-full max-w-lg px-2 pb-12">

        <div className="flex-1 flex flex-col justify-center items-center w-full py-4">
          <div className="text-center animate-in fade-in slide-in-from-top-4 duration-700">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
              Convierte este número a Hexadecimal
            </p>
              <span className="text-5xl font-mono font-bold text-blue-400">
                {targetNumber || "..."}
              </span>
          </div>
        </div>

        <div className="flex flex-col items-center w-full pb-8">
          <Grid 
            guesses={guesses} 
            currentGuess={currentGuess} 
            turn={turn} 
            feedbackHistory={feedbackHistory}
            length={secretLength}
            cursorPos={cursorPos}
            onCellClick={handleCellClick}
          />
        
          <div className="mt-6 w-full">
            <Keyboard onChar={handleChar} onDelete={handleDelete} onEnter={handleEnter} />
          </div>
        </div>

      </main>

      <Modal 
        isOpen={gameStatus !== 'PLAYING'} 
        hasWon={gameStatus === 'WON'}
        secretCode={secretCode}
        onClose={() => window.location.reload()}
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />

      <TipModal 
        isOpen={isTipOpen} onClose={() => setIsTipOpen(false)} 
        targetNumber={targetNumber}
        />
    </div>
    
  );
}

export default App;