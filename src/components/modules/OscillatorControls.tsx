import { useSynthContext } from '../../context/SynthContext'
import { ModulePanel } from '../controls/ModulePanel'
import { WaveformSelector } from '../controls/WaveformSelector'

interface Props {
  locked?: boolean
}

export function OscillatorControls({ locked = false }: Props) {
  const { params, setOscType } = useSynthContext()

  return (
    <ModulePanel title="Oscillator" locked={locked}>
      <div className="flex flex-col gap-3">
        <WaveformSelector value={params.oscType} onChange={setOscType} />
        <p className="text-[10px] text-nord-3 leading-relaxed">
          The oscillator generates the raw waveform — the fundamental building block of the sound.
        </p>
      </div>
    </ModulePanel>
  )
}
