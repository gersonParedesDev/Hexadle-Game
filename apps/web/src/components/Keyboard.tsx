import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

const Keyboard: React.FC = () => {
  const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
  const thirdRow = [faCheck, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', faDeleteLeft];

  return (
    <div className="p-4 flex flex-col items-center space-y-2">
      <div className="flex space-x-1.5">
        {firstRow.map((key, index) => (
          <button
            key={index}
            className="w-13 h-13 bg-gray-700 text-white rounded-sm 
            flex items-center justify-center font-semibold hover:bg-gray-600
            cursor-pointer
            "
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex space-x-1.5">
        {secondRow.map((key, index) => (
          <button
            key={index}
            className="w-13 h-13 bg-gray-700 text-white rounded-md 
            flex items-center justify-center font-semibold hover:bg-gray-600
            cursor-pointer
            "
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex space-x-1.5">
        {thirdRow.map((key, index) => (
          <button
            key={index}
            className={`w-13 h-13 bg-gray-700 text-white rounded-md 
              flex items-center justify-center font-semibold cursor-pointer`}
          >
            {typeof key === 'string' ? (
              key
            ) : (
              <FontAwesomeIcon icon={key} className="text-xl" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;