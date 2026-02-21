import { useSynthContext } from '../../context/SynthContext'
import { ModulePanel } from '../controls/ModulePanel'
import { RotaryKnob } from '../controls/RotaryKnob'
import { Toggle } from '../controls/Toggle'
import type { LFOTarget } from '../../audio/types'

interface Props {
  locked?: boolean
}

export function LFOControls({ locked = false }: Props) {
  const { params, setLFORate, setLFODepth, setLFOTarget, setLFOEnabled } = useSynthContext()

  return (
    <ModulePanel title="LFO" locked={locked}>
      <div className="flex flex-col gap-3">
        <Toggle label="Enable" value={params.lfoEnabled} onChange={setLFOEnabled} />
        <div className="flex gap-4 justify-center">
          <RotaryKnob
            label="Rate"
            value={params.lfoRate}
            min={0.1}
            max={20}
            onChange={setLFORate}
            formatValue={(v) => `${v.toFixed(1)} Hz`}
            disabled={!params.lfoEnabled}
          />
          <RotaryKnob
            label="Depth"
            value={params.lfoDepth}
            min={0}
            max={1}
            onChange={setLFODepth}
            formatValue={(v) => `${Math.round(v * 100)}%`}
            disabled={!params.lfoEnabled}
          />
        </div>
        {/* Target selector */}
        <div className="flex gap-1.5 justify-center">
          {(['filter', 'pitch'] as LFOTarget[]).map((target) => (
            <button
              key={target}
              onClick={() => setLFOTarget(target)}
              disabled={!params.lfoEnabled}
              className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-30 ${
                params.lfoTarget === target
                  ? 'bg-nord-8/20 text-nord-8'
                  : 'text-nord-3 hover:text-nord-4'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-nord-3 leading-relaxed">
          The LFO modulates another parameter over time, creating movement and vibrato.
        </p>
      </div>
    </ModulePanel>
  )
}
