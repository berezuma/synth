import { useKnob } from '../../hooks/useKnob'

interface RotaryKnobProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
  sensitivity?: number
  disabled?: boolean
}

const SIZE = 56
const CX = SIZE / 2
const CY = SIZE / 2
const RADIUS = 22
const STROKE_WIDTH = 3
const START_ANGLE = -225
const END_ANGLE = 45
const RANGE = END_ANGLE - START_ANGLE // 270 degrees

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

export function RotaryKnob({
  label,
  value,
  min,
  max,
  onChange,
  formatValue,
  sensitivity = 200,
  disabled = false,
}: RotaryKnobProps) {
  const { onPointerDown, onPointerMove, onPointerUp } = useKnob({
    min, max, value, onChange, sensitivity,
  })

  const normalized = (value - min) / (max - min)
  const angle = START_ANGLE + normalized * RANGE
  const indicator = polarToCartesian(CX, CY, RADIUS - 8, angle)
  const displayValue = formatValue ? formatValue(value) : value.toFixed(0)

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <span className="text-[10px] text-nord-3 uppercase tracking-wider">
        {label}
      </span>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={`cursor-grab active:cursor-grabbing touch-none ${disabled ? 'opacity-30 pointer-events-none' : ''}`}
        onPointerDown={disabled ? undefined : onPointerDown}
        onPointerMove={disabled ? undefined : onPointerMove}
        onPointerUp={disabled ? undefined : onPointerUp}
      >
        {/* Background track */}
        <path
          d={describeArc(CX, CY, RADIUS, START_ANGLE, END_ANGLE)}
          fill="none"
          stroke="var(--color-nord-2)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />
        {/* Value arc */}
        {normalized > 0.005 && (
          <path
            d={describeArc(CX, CY, RADIUS, START_ANGLE, angle)}
            fill="none"
            stroke="var(--color-nord-8)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        )}
        {/* Center circle */}
        <circle cx={CX} cy={CY} r={RADIUS - 5} fill="var(--color-nord-1)" />
        {/* Indicator dot */}
        <circle cx={indicator.x} cy={indicator.y} r={2.5} fill="var(--color-nord-8)" />
      </svg>
      <span className="text-[11px] text-nord-8 tabular-nums">
        {displayValue}
      </span>
    </div>
  )
}
