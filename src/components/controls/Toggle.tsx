interface ToggleProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export function Toggle({ label, value, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      disabled={disabled}
      className={`flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:pointer-events-none`}
    >
      <div
        className={`w-8 h-4 rounded-full relative transition-colors ${
          value ? 'bg-nord-8' : 'bg-nord-2'
        }`}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-nord-6 transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
      <span className="text-[10px] text-nord-3 uppercase tracking-wider">{label}</span>
    </button>
  )
}
