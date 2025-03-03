import React from 'react';
import Keyboard from './components/keyboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  
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
        <div className="grid grid-cols-4 gap-2 p-4 w-fit mx-auto">
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-950 border-2 border-gray-600 rounded-sm
                flex items-center justify-center cursor-pointer
                text-white font-extrabold text-2xl"
            >
              
            </div>
          ))}
        </div>
      </main>

      <footer className='bg-gray-950 p-20'>
        <Keyboard/>
      </footer>
    </div>
  );
};

export default App;