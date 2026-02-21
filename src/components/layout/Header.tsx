import { GainControl } from '../modules/GainControl'

interface Props {
  guidedMode: boolean
  onToggleGuided: () => void
}

export function Header({ guidedMode, onToggleGuided }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-nord-2">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-nord-8 tracking-tight">Synthesis Primer</h1>
        <span className="text-[10px] text-nord-3 uppercase tracking-widest hidden sm:inline">
          Interactive Subtractive Synth
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleGuided}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
            guidedMode
              ? 'bg-nord-14/20 text-nord-14'
              : 'bg-nord-2 text-nord-3 hover:text-nord-4'
          }`}
        >
          {guidedMode ? 'Exit Tutorial' : 'Tutorial'}
        </button>
        <GainControl />
      </div>
    </header>
  )
}
