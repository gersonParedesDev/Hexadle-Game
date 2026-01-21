import { BarChart3, Info, Lightbulb } from 'lucide-react';

interface HeaderProps {
  length: number;
  onOpenHelp: () => void;
  onOpenTip: () => void;
}

export function Header({ length, onOpenHelp, onOpenTip }: HeaderProps) {
  const showProTip = length >= 4;

  return (
    <header className="w-full max-w-lg px-4 py-6 flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <button 
          onClick={onOpenHelp}
          className="p-2 text-gray-400 cursor-pointer hover:text-blue-400 transition-colors rounded-full hover:bg-blue-400/10"
          title="game manual"
        >
          <Info size={24} strokeWidth={2.5} />
        </button>

        {showProTip && (
          <button 
            onClick={onOpenTip}
            className="p-2 text-yellow-600 cursor-pointer hover:text-yellow-400 transition-colors rounded-full hover:bg-yellow-400/10 animate-pulse"
            title="Tip de Experto"
          >
            <Lightbulb size={24} strokeWidth={2.5} fill="currentColor" className="opacity-50 hover:opacity-100" />
          </button>
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          HEXADLE
        </h1>
      </div>

      <button 
        className="p-2 text-gray-400 hover:text-purple-400 transition-colors rounded-full hover:bg-purple-400/10"
        aria-label="Estadísticas"
      >
        <BarChart3 size={24} strokeWidth={2.5} />
      </button>

    </header>
  );
}