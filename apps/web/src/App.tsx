import React, { useState, useEffect  } from 'react';
import Keyboard from './components/keyboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {

  

  const [randomWord, setRandomWord] = useState<string>('');
  const [rows, setRows] = useState<string[][]>([])


  const fetchWords = async () => {
    try {
      const response = await fetch('http://localhost:4000/words');
      const data = await response.json();
      const words = data.words;

      if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        setRandomWord(words[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  }

  useEffect(() => {
    if (randomWord) {
      setRows(Array(5).fill(Array(randomWord.length).fill("")));
    }
  }, [randomWord]);

  useEffect(() => {
    fetchWords();
  }, []);

    if (!randomWord) {
      return <div className="flex items-center justify-center h-screen bg-gray-950 text-white">Cargando...</div>;
    }

  const updateLetter = (rowIndex: number, letterIndex: number, letter: string) => {
    const newRows = rows.map((row, i) =>
      i === rowIndex ? row.map((char, j) => (j === letterIndex ? letter : char)) : row
    );
    setRows(newRows);
  };
  
  return (
    <div className="overflow-y-hidden h-screen flex flex-col">

      <header className="bg-gray-950 text-white flex items-center justify-between px-8 py-5">
        <button className="text-gray-600 hover:text-white cursor-pointer">
          <FontAwesomeIcon icon={faUser} />
        </button>
        <h1 className="text-lg font-semibold">Wordle</h1>
        <button className="text-gray-600 hover:text-white cursor-pointer">
          <FontAwesomeIcon icon={faChartLine} />
        </button>
      </header>

      <main className="flex-grow bg-gray-950 flex flex-col items-center justify-center overflow-y-auto">
        <form className="flex flex-col items-center gap-2">
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
      </main>


      <footer className='bg-gray-950 p-20'>
        <Keyboard/>
      </footer>
    </div>
  );
};

export default App;