import { X, ArrowRight, Calculator, Table2, Hash, Sigma } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      {/* 👇 CAMBIO: max-w-4xl para hacerlo mucho más ancho */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🎓 Manual de Hexadecimal
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido con Grid de 2 Columnas */}
        <div className="p-0 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* --- COLUMNA IZQUIERDA: CÓMO JUGAR (Decimal -> Hex) --- */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-700 space-y-6">
              <h3 className="text-lg font-bold text-green-400 flex items-center gap-2 mb-4">
                <Calculator size={20} />
                Objetivo: Decimal a Hex
              </h3>
              
              <p className="text-sm text-gray-300">
                El juego te da un número Decimal (Base 10). Para pasarlo a Hexadecimal, debes <strong>dividir por 16</strong> repetidamente.
              </p>

              {/* TABLA DE REFERENCIA */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs uppercase font-bold">
                  <Table2 size={14} /> Tabla de Conversión
                </div>
                <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`p-1 rounded ${i > 9 ? 'bg-purple-900/40 text-purple-200 font-bold border border-purple-500/30' : 'bg-gray-700/50 text-gray-400'}`}>
                      {i}={i.toString(16).toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              {/* EJEMPLO DE DIVISIÓN */}
              <div className="bg-gray-950 p-4 rounded-lg font-mono text-sm border-l-4 border-green-500">
                <p className="text-gray-400 text-xs mb-2">Ejemplo: Convertir <strong>314</strong></p>
                
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span>314 ÷ 16 = <strong className="text-white">19</strong></span>
                    <span className="text-yellow-500">Resto: 10 (A)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span>19 ÷ 16 = <strong className="text-white">1</strong></span>
                    <span className="text-yellow-500">Resto: 3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 ÷ 16 = <strong className="text-white">0</strong></span>
                    <span className="text-yellow-500">Resto: 1</span>
                  </div>
                </div>
                
                <div className="mt-3 text-right">
                  <span className="text-xs text-gray-500 mr-2">Resultado (Abajo hacia arriba):</span>
                  <span className="text-xl font-bold text-green-400">13A</span>
                </div>
              </div>
            </div>

            {/* --- COLUMNA DERECHA: TEORÍA (Hex -> Decimal) --- */}
            {/* 👇 ESTO ES LO NUEVO QUE PEDISTE */}
            <div className="p-6 bg-gray-800/20 space-y-6">
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-4">
                <Hash size={20} />
                ¿Cómo funcionan las posiciones?
              </h3>

              <p className="text-sm text-gray-300">
                El hexadecimal es un sistema posicional. Cada posición vale <strong>16 veces más</strong> que la anterior (Potencias de 16).
              </p>

              {/* EXPLICACIÓN VISUAL DE POTENCIAS */}
              <div className="flex justify-around text-center mb-4">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-xs mb-1">Posición 4</span>
                    <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/50 rounded flex items-center justify-center font-bold text-blue-300">
                    16<sup className="text-xs">4</sup>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">= 65536</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-xs mb-1">Posición 3</span>
                    <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/50 rounded flex items-center justify-center font-bold text-blue-300">
                    16<sup className="text-xs">3</sup>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">= 4096</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-xs mb-1">Posición 2</span>
                  <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/50 rounded flex items-center justify-center font-bold text-blue-300">
                    16<sup className="text-xs">2</sup>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">= 256</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-xs mb-1">Posición 1</span>
                  <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/50 rounded flex items-center justify-center font-bold text-blue-300">
                    16<sup className="text-xs">1</sup>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">= 16</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-xs mb-1">Posición 0</span>
                  <div className="w-12 h-12 bg-blue-900/30 border border-blue-500/50 rounded flex items-center justify-center font-bold text-blue-300">
                    16<sup className="text-xs">0</sup>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">= 1</span>
                </div>
              </div>

              {/* EJEMPLO DE CÁLCULO INVERSO */}
              <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-400 text-xs mb-3">
                  Ejemplo: ¿Cuánto vale el código <strong>2B</strong>?
                </p>

                <div className="space-y-3 font-mono text-sm">
                  {/* Fila 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-800 px-2 py-1 rounded text-purple-300 font-bold border border-purple-500/30">B</span>
                      <span className="text-gray-500">x</span>
                      <span className="text-blue-300">16⁰</span>
                    </div>
                    <div className="text-gray-400 text-xs">(11 x 1)</div>
                    <span className="text-white font-bold">= 11</span>
                  </div>

                  {/* Fila 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-800 px-2 py-1 rounded text-white font-bold border border-gray-600">2</span>
                      <span className="text-gray-500">x</span>
                      <span className="text-blue-300">16¹</span>
                    </div>
                    <div className="text-gray-400 text-xs">(2 x 16)</div>
                    <span className="text-white font-bold">= 32</span>
                  </div>

                  {/* Suma Total */}
                  <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Sigma size={14}/> SUMA TOTAL
                    </span>
                    <span className="text-xl font-bold text-blue-400">43</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 italic mt-4">
                * Este método es útil para verificar si tu respuesta Hexadecimal coincide con el objetivo Decimal.
              </p>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-end">
          <button 
            onClick={onClose}
            className="w-full cursor-pointer sm:w-auto px-8 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-95 flex items-center justify-center gap-2"
          >
            ¡ENTENDIDO! <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}