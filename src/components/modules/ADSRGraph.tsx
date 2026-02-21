import { useMemo } from 'react'
import { useSynthContext } from '../../context/SynthContext'
import { ModulePanel } from '../controls/ModulePanel'
import { RotaryKnob } from '../controls/RotaryKnob'
import { formatTime } from '../../utils/formatFrequency'

interface Props {
  locked?: boolean
}

function buildEnvelopePath(
  attack: number,
  decay: number,
  sustain: number,
  release: number,
  width: number,
  height: number,
): string {
  const pad = 2
  const w = width - pad * 2
  const h = height - pad * 2
  const totalTime = attack + decay + 0.3 + release
  const scaleX = (t: number) => pad + (t / totalTime) * w
  const scaleY = (v: number) => pad + (1 - v) * h

  const x0 = scaleX(0)
  const y0 = scaleY(0)
  const x1 = scaleX(attack)
  const y1 = scaleY(1)
  const x2 = scaleX(attack + decay)
  const y2 = scaleY(sustain)
  const x3 = scaleX(attack + decay + 0.3)
  const y3 = scaleY(sustain)
  const x4 = scaleX(totalTime)
  const y4 = scaleY(0)

  return `M${x0},${y0} L${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4}`
}

export function ADSRGraph({ locked = false }: Props) {
  const { params, setAttack, setDecay, setSustain, setRelease } = useSynthContext()
  const { attack, decay, sustain, release } = params

  const envelopePath = useMemo(
    () => buildEnvelopePath(attack, decay, sustain, release, 200, 48),
    [attack, decay, sustain, release],
  )

  return (
    <ModulePanel title="Envelope" locked={locked}>
      <div className="flex flex-col gap-3">
        {/* SVG envelope visualization */}
        <div className="bg-nord-0 rounded-lg p-1">
          <svg width="100%" height="48" viewBox="0 0 200 48" preserveAspectRatio="none">
            <path
              d={envelopePath}
              fill="none"
              stroke="var(--color-nord-8)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Fill under curve */}
            <path
              d={`${envelopePath} L200,48 L0,48 Z`}
              fill="var(--color-nord-8)"
              fillOpacity="0.1"
            />
          </svg>
        </div>
        {/* ADSR knobs */}
        <div className="flex gap-2 justify-center">
          <RotaryKnob
            label="Attack"
            value={attack}
            min={0.001}
            max={2}
            onChange={setAttack}
            formatValue={formatTime}
          />
          <RotaryKnob
            label="Decay"
            value={decay}
            min={0.001}
            max={2}
            onChange={setDecay}
            formatValue={formatTime}
          />
          <RotaryKnob
            label="Sustain"
            value={sustain}
            min={0}
            max={1}
            onChange={setSustain}
            formatValue={(v) => `${Math.round(v * 100)}%`}
          />
          <RotaryKnob
            label="Release"
            value={release}
            min={0.01}
            max={4}
            onChange={setRelease}
            formatValue={formatTime}
          />
        </div>
        <p className="text-[10px] text-nord-3 leading-relaxed">
          The ADSR envelope shapes how the sound evolves — from the initial attack to the final release.
        </p>
      </div>
    </ModulePanel>
  )
}
