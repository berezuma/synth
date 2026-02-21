import { useSynthContext } from '../../context/SynthContext'
import { ModulePanel } from '../controls/ModulePanel'
import { RotaryKnob } from '../controls/RotaryKnob'
import { formatFrequency } from '../../utils/formatFrequency'

interface Props {
  locked?: boolean
}

export function FilterSection({ locked = false }: Props) {
  const { params, setFilterCutoff, setFilterQ } = useSynthContext()

  return (
    <ModulePanel title="Filter" locked={locked}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 justify-center">
          <RotaryKnob
            label="Cutoff"
            value={params.filterCutoff}
            min={20}
            max={20000}
            onChange={setFilterCutoff}
            formatValue={formatFrequency}
            sensitivity={150}
          />
          <RotaryKnob
            label="Resonance"
            value={params.filterQ}
            min={0.1}
            max={20}
            onChange={setFilterQ}
            formatValue={(v) => v.toFixed(1)}
            sensitivity={150}
          />
        </div>
        <p className="text-[10px] text-nord-3 leading-relaxed">
          The low-pass filter removes frequencies above the cutoff point, shaping the tone.
        </p>
      </div>
    </ModulePanel>
  )
}
