export function formatFrequency(hz: number): string {
  if (hz >= 1000) {
    return `${(hz / 1000).toFixed(1)} kHz`
  }
  return `${Math.round(hz)} Hz`
}

export function formatTime(seconds: number): string {
  if (seconds >= 1) {
    return `${seconds.toFixed(1)} s`
  }
  return `${Math.round(seconds * 1000)} ms`
}
