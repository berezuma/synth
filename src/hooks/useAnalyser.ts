import { useRef, useEffect } from 'react'

export function useAnalyser(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  getData: () => Float32Array,
  drawFn: (ctx: CanvasRenderingContext2D, data: Float32Array, width: number, height: number) => void,
) {
  const rafId = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const data = getData()
      drawFn(ctx, data, rect.width, rect.height)
      rafId.current = requestAnimationFrame(draw)
    }

    rafId.current = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(rafId.current)
  }, [canvasRef, getData, drawFn])
}
