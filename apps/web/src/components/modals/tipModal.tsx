import { useMemo } from 'react';
import { X, Zap, Target} from 'lucide-react';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetNumber: string; // 👈 Recibimos el número objetivo
}

export function TipModal({ isOpen, onClose, targetNumber }: TipModalProps) {
  if (!isOpen) return null;

  // 👇 LÓGICA MATEMÁTICA DE "REDONDEO"
  const tipData = useMemo(() => {
    const decimal = parseInt(targetNumber, 10);
    if (isNaN(decimal)) return null;

    // 1. Calculamos la magnitud (potencia base)
    // Ejemplo: Para 40478, log16 es ~3.8. Math.floor es 3.
    // Significa que estamos trabajando con miles (16^3 = 4096)
    const power = Math.floor(Math.log(decimal) / Math.log(16));
    const placeValue = Math.pow(16, power);

    // 2. Buscamos el múltiplo más cercano (El "Vecino Redondo")
    // 40478 / 4096 = 9.88 -> Redondeamos a 10 (A)
    const nearestMultiple = Math.round(decimal / placeValue);
    
    // 3. Construimos el número ancla
    const anchorDecimal = nearestMultiple * placeValue;
    // Truco: convertir a Hex y rellenar con ceros si hace falta para que se vea "redondo"
    // (Aunque multiplicar por la potencia ya nos da ceros en hex naturalmente)
    const anchorHex = anchorDecimal.toString(16).toUpperCase();
    
    // Dígito principal (ej: 'A')
    const mainDigit = anchorHex[0]; 

    return {
      power,         // 3
      placeValue,    // 4096
      anchorDecimal, // 40960
      anchorHex,     // A000
      mainDigit,     // A
      mainDigitVal: parseInt(mainDigit, 16) // 10
    };
  }, [targetNumber]);

  if (!tipData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-yellow-900/90 to-gray-900 border border-yellow-500/30 rounded-xl p-6 max-w-sm w-full shadow-[0_0_30px_rgba(234,179,8,0.2)] relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-500/50 hover:text-yellow-400 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Título */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-400 animate-pulse">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-none">Punto de Referencia</h3>
            <span className="text-xs text-yellow-500 font-mono uppercase tracking-wider">Aproximación</span>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Tu número <strong>({targetNumber})</strong> está muy cerca de este número redondo:
        </p>

        {/* TARJETA DEL NÚMERO REDONDO */}
        <div className="bg-black/40 rounded-lg border border-yellow-500/20 overflow-hidden mb-4">
          
          {/* Parte Superior: El Ancla Hexadecimal */}
          <div className="bg-yellow-500/10 p-4 text-center border-b border-yellow-500/10">
            <span className="block text-xs text-yellow-600 uppercase font-bold mb-1">Número Hex "Redondo"</span>
            <span className="text-4xl font-mono font-bold text-yellow-400 tracking-widest drop-shadow-sm">
              {tipData.anchorHex}
            </span>
          </div>

          {/* Parte Inferior: La Explicación Matemática */}
          <div className="p-4 bg-black/20">
            <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
              <span>Valor Decimal:</span>
              <span className="text-white font-bold font-mono">{tipData.anchorDecimal.toLocaleString()}</span>
            </div>
            
            <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-white/10">
              <p className="mb-1 font-bold text-yellow-600 uppercase">¿Por qué se escribe así?</p>
              <p>
                Porque <strong className="text-gray-300">{tipData.mainDigitVal}</strong> (Digito {tipData.mainDigit}) multiplicado por la posición <strong className="text-gray-300">16<sup>{tipData.power}</sup></strong> ({tipData.placeValue}) es igual a <strong>{tipData.anchorDecimal}</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 bg-yellow-900/20 p-2 rounded border border-yellow-500/10">
          <Zap size={14} className="text-yellow-500 shrink-0" />
          <p>
            Usa <strong>{tipData.anchorHex}</strong> como ancla. ¿Tu número es mayor o menor? Ajusta el primer dígito.
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-5 py-3 cursor-pointer bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors shadow-lg shadow-yellow-900/20"
        >
          ¡ENTENDIDO!
        </button>

      </div>
    </div>
  );
}