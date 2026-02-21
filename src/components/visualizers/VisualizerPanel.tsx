import { useState } from 'react'
import { ModulePanel } from '../controls/ModulePanel'
import { Oscilloscope } from './Oscilloscope'
import { Spectrogram } from './Spectrogram'

type Mode = 'waveform' | 'spectrum'

export function VisualizerPanel() {
  const [mode, setMode] = useState<Mode>('waveform')

  return (
    <ModulePanel title="Visualizer" className="col-span-full lg:col-span-2">
      <div className="flex flex-col gap-2">
        {/* Mode tabs */}
        <div className="flex gap-1">
          {(['waveform', 'spectrum'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                mode === m
                  ? 'bg-nord-8/20 text-nord-8'
                  : 'text-nord-3 hover:text-nord-4'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {/* Canvas container */}
        <div className="h-32 bg-nord-0 rounded-lg overflow-hidden">
          {mode === 'waveform' ? <Oscilloscope /> : <Spectrogram />}
        </div>
      </div>
    </ModulePanel>
  )
}
