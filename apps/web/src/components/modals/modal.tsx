interface ModalProps {
  isOpen: boolean;
  hasWon: boolean;
  secretCode: string;
  onClose: () => void;
}

const HEX_TO_BINARY_MAP: Record<string, string> = {
  '0': '0000', '1': '0001', '2': '0010', '3': '0011',
  '4': '0100', '5': '0101', '6': '0110', '7': '0111',
  '8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
  'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
};

function HexToDecimalExplanation({ hex }: { hex: string }) {
  if (!hex || hex === "??????") return null;

  const digits = hex.split('').reverse();
  const totalDecimal = parseInt(hex, 16);

  return (
    <div className="mt-4 bg-gray-900/80 p-4 rounded-lg border border-gray-700">
      <h3 className="text-purple-400 text-xs uppercase font-bold tracking-widest mb-3 border-b border-gray-700 pb-2">
        Análisis Hexadecimal (Base 16)
      </h3>
      
      <div className="space-y-2 font-mono text-sm">
        {digits.map((digit, index) => {
          const decimalValue = parseInt(digit, 16);
          const power = Math.pow(16, index);
          const partial = decimalValue * power;

          return (
            <div key={index} className="flex flex-wrap justify-between items-center text-gray-300">

              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded text-white font-bold border border-gray-600">
                  {digit}
                </span>
                <span className="text-gray-500">×</span>
                <span className="text-blue-300">
                  16<sup className="text-xs text-gray-400">{index}</sup>
                </span>
                <span className="text-gray-600 text-xs hidden sm:inline">
                  ({power})
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-500">=</span>
                <span className="text-white font-bold min-w-[3rem] text-right">
                  {partial.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-600 bg-gray-800/50 p-2 rounded">
          <span className="text-gray-400 text-xs uppercase">Resultado Decimal</span>
          <span className="text-green-400 font-bold text-xl">
            {totalDecimal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function HexToBinaryExplanation({ hex }: { hex: string }) {
  if (!hex || hex === "??????") return null;

  return (
    <div className="mt-4 bg-gray-900/80 p-4 rounded-lg border border-gray-700">
      <h3 className="text-blue-400 text-xs uppercase font-bold tracking-widest mb-3 border-b border-gray-700 pb-2">
        Traducción a Binario (Base 2)
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        Cada dígito Hexadecimal equivale exactamente a 4 bits binarios.
      </p>

      <div className="flex justify-center flex-wrap gap-2">
        {hex.split('').map((digit, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Dígito Hex */}
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 border border-purple-500/50 rounded text-purple-300 font-bold mb-1">
              {digit}
            </div>
            {/* Flecha */}
            <span className="text-gray-600 text-xs mb-1">↓</span>
            {/* Bloque Binario */}
            <div className="bg-gray-950 px-2 py-1 rounded border border-blue-500/30 text-blue-300 font-mono text-xs">
              {HEX_TO_BINARY_MAP[digit] || '????'}
            </div>
          </div>
        ))}
      </div>
      
      {/* Cadena Completa */}
      <div className="mt-4 text-center">
        <span className="text-gray-500 text-xs mr-2">CADENA COMPLETA:</span>
        <span className="font-mono text-blue-200 text-xs sm:text-sm break-all">
          {hex.split('').map(d => HEX_TO_BINARY_MAP[d]).join(' ')}
        </span>
      </div>
    </div>
  );
}

export function Modal({ isOpen, hasWon, secretCode, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 my-8">

        <div className="text-center mb-6">
          <h2 className={`text-4xl font-bold mb-2 ${hasWon ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'text-red-400'}`}>
            {hasWon ? '¡MISIÓN CUMPLIDA!' : 'PERDISTE!'}
          </h2>
          <p className="text-gray-400 text-sm">
            {hasWon 
              ? 'Has demostrado dominio total sobre la base 16.' 
              : 'Se han agotado tus intentos. Aquí tienes el análisis del código:'}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 mb-6 border border-gray-700 shadow-inner">
          <span className="text-xs text-gray-500 uppercase tracking-widest mb-2">Código Correcto</span>
          <span className="text-6xl font-mono font-bold text-white tracking-widest drop-shadow-md">
            {secretCode}
          </span>
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          <HexToDecimalExplanation hex={secretCode} />
          <HexToBinaryExplanation hex={secretCode} />
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-6 bg-purple-600 cursor-pointer hover:bg-purple-700 active:scale-95 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-purple-500/30 uppercase tracking-wider"
        >
          {hasWon ? 'Siguiente Código' : 'Reintentar'}
        </button>

      </div>
    </div>
  );
}