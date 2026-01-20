
interface KeyboardProps {
  onChar: (char: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}

export function Keyboard({onEnter,onDelete, onChar}: KeyboardProps) {
  const firstRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const secondRow = ['A', 'B', 'C', 'D', 'E', 'F'];

  const baseButtonClass = "h-14 rounded bg-gray-600 text-white font-bold text-lg hover:bg-gray-500 active:bg-gray-400 transition-colors flex items-center justify-center cursor-pointer select-none shadow-md";

  return (
    <div className='w-full max-w-lg px-2 mt-4 flex flex-col gap-2'>
      <div className="flex gap-1.5 justify-center">
        {firstRow.map((char) =>(
          <button
            key={char}
            onClick={() => onChar(char)}
            className={`${baseButtonClass} flex-1`}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 justify-center px-4">
        {secondRow.map((char) => (
          <button
            key={char}
            onClick={() => onChar(char)}
            className={`${baseButtonClass} flex-1`}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-2 px-8">
        <button 
            onClick={onEnter}
            className={`${baseButtonClass} flex-1 !bg-green-900 hover:!bg-green-600`}
        >
            Enter
        </button>
        <button 
            onClick={onDelete}
            className={`${baseButtonClass} w-24 !bg-red-900/50 hover:!bg-red-800`} 
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
            </svg>
        </button>
      </div>
    </div>
  );
}