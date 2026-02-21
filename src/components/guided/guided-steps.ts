import type { SynthParams } from '../../audio/types'

export type ModuleId = 'oscillator' | 'filter' | 'adsr' | 'lfo' | 'gain' | 'visualizer' | 'keyboard'

export interface GuidedStep {
  id: number
  title: string
  instruction: string
  unlockedModules: ModuleId[]
  completionCondition: (params: SynthParams, history: GuidedHistory) => boolean
  hint: string
}

export interface GuidedHistory {
  filterCutoffMin: number
  filterCutoffMax: number
  triedStaccato: boolean
  triedSwell: boolean
}

export const INITIAL_HISTORY: GuidedHistory = {
  filterCutoffMin: Infinity,
  filterCutoffMax: -Infinity,
  triedStaccato: false,
  triedSwell: false,
}

export const GUIDED_STEPS: GuidedStep[] = [
  {
    id: 1,
    title: 'Meet the Oscillator',
    instruction:
      'The oscillator generates the raw waveform. Try each waveform shape — sine, square, sawtooth, and triangle — to hear how they differ. Select the sawtooth wave to continue.',
    unlockedModules: ['oscillator', 'gain', 'visualizer', 'keyboard'],
    completionCondition: (p) => p.oscType === 'sawtooth',
    hint: 'Click the SAW waveform icon (the zigzag) in the Oscillator panel.',
  },
  {
    id: 2,
    title: 'Shape with the Filter',
    instruction:
      'A low-pass filter removes high frequencies. Sweep the cutoff knob from low to high to hear the filter open up. Move it across a wide range to continue.',
    unlockedModules: ['oscillator', 'filter', 'gain', 'visualizer', 'keyboard'],
    completionCondition: (_p, h) => h.filterCutoffMax - h.filterCutoffMin > 2000,
    hint: 'Drag the Cutoff knob up and down to sweep through the frequency range.',
  },
  {
    id: 3,
    title: 'Control the Envelope',
    instruction:
      'The ADSR envelope shapes how a note starts and fades. Try creating a staccato sound (short attack + decay, low sustain), then a slow swell (long attack, high sustain).',
    unlockedModules: ['oscillator', 'filter', 'adsr', 'gain', 'visualizer', 'keyboard'],
    completionCondition: (_p, h) => h.triedStaccato && h.triedSwell,
    hint: 'Staccato: Attack < 50ms, Decay < 300ms, Sustain < 30%. Swell: Attack > 500ms, Sustain > 70%.',
  },
]
