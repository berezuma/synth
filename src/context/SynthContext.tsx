import { createContext, useContext, type ReactNode } from 'react'
import { useSynth, type UseSynthReturn } from '../hooks/useSynth'

const SynthContext = createContext<UseSynthReturn | null>(null)

export function SynthProvider({ children }: { children: ReactNode }) {
  const synth = useSynth()
  return (
    <SynthContext.Provider value={synth}>
      {children}
    </SynthContext.Provider>
  )
}

export function useSynthContext(): UseSynthReturn {
  const ctx = useContext(SynthContext)
  if (!ctx) throw new Error('useSynthContext must be used within SynthProvider')
  return ctx
}
