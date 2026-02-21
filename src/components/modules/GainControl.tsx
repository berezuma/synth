import { useSynthContext } from '../../context/SynthContext'
import { RotaryKnob } from '../controls/RotaryKnob'

export function GainControl() {
  const { params, setMasterGain } = useSynthContext()

  return (
    <RotaryKnob
      label="Volume"
      value={params.masterGain}
      min={0}
      max={1}
      onChange={setMasterGain}
      formatValue={(v) => `${Math.round(v * 100)}%`}
    />
  )
}
