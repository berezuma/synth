import { useRef, useCallback } from 'react'
import { useAnalyser } from '../../hooks/useAnalyser'
import { useSynthContext } from '../../context/SynthContext'

export function Spectrogram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { getFFTValues } = useSynthContext()

  const draw = useCallback((ctx: CanvasRenderingContext2D, data: Float32Array, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = '#2E3440'
    ctx.fillRect(0, 0, width, height)

    if (data.length === 0) return

    const barCount = Math.min(data.length / 2, 128)
    const barWidth = width / barCount

    for (let i = 0; i < barCount; i++) {
      const db = data[i]
      const normalized = Math.max(0, (db + 100) / 100)
      const barHeight = normalized * height

      const hue = 193 + (i / barCount) * 20
      const lightness = 40 + normalized * 30
      ctx.fillStyle = `hsl(${hue}, 60%, ${lightness}%)`
      ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight)
    }
  }, [])

  useAnalyser(canvasRef, getFFTValues, draw)

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg"
      style={{ display: 'block' }}
    />
  )
}
