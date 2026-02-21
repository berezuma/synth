import { useRef, useCallback } from 'react'
import { useAnalyser } from '../../hooks/useAnalyser'
import { useSynthContext } from '../../context/SynthContext'

export function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { getWaveformValues } = useSynthContext()

  const draw = useCallback((ctx: CanvasRenderingContext2D, data: Float32Array, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    // Background
    ctx.fillStyle = '#2E3440'
    ctx.fillRect(0, 0, width, height)

    // Grid center line
    ctx.strokeStyle = '#3B425240'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()

    // Waveform
    if (data.length === 0) return
    ctx.strokeStyle = '#88C0D0'
    ctx.lineWidth = 2
    ctx.beginPath()

    const sliceWidth = width / data.length
    for (let i = 0; i < data.length; i++) {
      const x = i * sliceWidth
      const y = ((1 - data[i]) / 2) * height
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }, [])

  useAnalyser(canvasRef, getWaveformValues, draw)

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg"
      style={{ display: 'block' }}
    />
  )
}
