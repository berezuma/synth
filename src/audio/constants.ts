import type { SynthParams } from './types'

export const DEFAULT_PARAMS: SynthParams = {
  oscType: 'sawtooth',
  oscFrequency: 220,
  filterCutoff: 2000,
  filterQ: 1,
  attack: 0.1,
  decay: 0.2,
  sustain: 0.5,
  release: 0.8,
  lfoRate: 2,
  lfoDepth: 0.5,
  lfoTarget: 'filter',
  lfoEnabled: false,
  masterGain: 0.7,
}

export const OSC_TYPES = ['sine', 'square', 'sawtooth', 'triangle'] as const

export const NOTES: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61,
  'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
  'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
}

export const KEYBOARD_NOTE_MAP: Record<string, string> = {
  'a': 'C3', 's': 'D3', 'd': 'E3', 'f': 'F3',
  'g': 'G3', 'h': 'A3', 'j': 'B3',
  'k': 'C4', 'l': 'D4',
  'q': 'C4', 'w': 'D4', 'e': 'E4', 'r': 'F4',
  't': 'G4', 'y': 'A4', 'u': 'B4', 'i': 'C5',
}
