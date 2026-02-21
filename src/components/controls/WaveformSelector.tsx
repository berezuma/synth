import type { OscType } from '../../audio/types'

interface WaveformSelectorProps {
  value: OscType
  onChange: (type: OscType) => void
  options?: OscType[]
}

const WAVEFORM_PATHS: Record<OscType, string> = {
  sine: 'M2 8 Q6 2 10 8 Q14 14 18 8',
  square: 'M2 12 L2 4 L10 4 L10 12 L18 12 L18 4',
  sawtooth: 'M2 12 L10 4 L10 12 L18 4',
  triangle: 'M2 12 L6 4 L14 12 L18 4',
}

const LABELS: Record<OscType, string> = {
  sine: 'SIN',
  square: 'SQR',
  sawtooth: 'SAW',
  triangle: 'TRI',
}

export function WaveformSelector({
  value,
  onChange,
  options = ['sine', 'square', 'sawtooth', 'triangle'],
}: WaveformSelectorProps) {
  return (
    <div className="flex gap-1.5">
      {options.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors cursor-pointer ${
            value === type
              ? 'bg-nord-8/20 text-nord-8'
              : 'text-nord-3 hover:text-nord-4 hover:bg-nord-2/50'
          }`}
        >
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path
              d={WAVEFORM_PATHS[type]}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-[8px] uppercase tracking-wider">{LABELS[type]}</span>
        </button>
      ))}
    </div>
  )
}
