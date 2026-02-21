import { useRef, useCallback } from 'react'
import { clamp } from '../utils/clamp'

interface UseKnobOptions {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  sensitivity?: number
}

export function useKnob({ min, max, value, onChange, sensitivity = 200 }: UseKnobOptions) {
  const dragState = useRef<{ startY: number; startValue: number } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragState.current = { startY: e.clientY, startValue: value }
  }, [value])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current) return
    const dy = dragState.current.startY - e.clientY
    const range = max - min
    const delta = (dy / sensitivity) * range
    const newValue = clamp(dragState.current.startValue + delta, min, max)
    onChange(newValue)
  }, [min, max, sensitivity, onChange])

  const onPointerUp = useCallback(() => {
    dragState.current = null
  }, [])

  return { onPointerDown, onPointerMove, onPointerUp }
}
