import React, { useState, useEffect  } from 'react';
import Keyboard from './components/Keyboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';
import GameBoard from './components/GameBoard';

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
        <GameBoard rows={rows} updateLetter={updateLetter}/>
      </main>


      <footer className='bg-gray-950 p-20'>
        <Keyboard/>
      </footer>
    </div>
  );
};

export default App;