export type OscType = 'sine' | 'square' | 'sawtooth' | 'triangle'
export type LFOTarget = 'filter' | 'pitch'

export interface SynthParams {
  oscType: OscType
  oscFrequency: number
  filterCutoff: number
  filterQ: number
  attack: number
  decay: number
  sustain: number
  release: number
  lfoRate: number
  lfoDepth: number
  lfoTarget: LFOTarget
  lfoEnabled: boolean
  masterGain: number
}

export type SynthAction =
  | { type: 'SET_OSC_TYPE'; value: OscType }
  | { type: 'SET_OSC_FREQUENCY'; value: number }
  | { type: 'SET_FILTER_CUTOFF'; value: number }
  | { type: 'SET_FILTER_Q'; value: number }
  | { type: 'SET_ATTACK'; value: number }
  | { type: 'SET_DECAY'; value: number }
  | { type: 'SET_SUSTAIN'; value: number }
  | { type: 'SET_RELEASE'; value: number }
  | { type: 'SET_LFO_RATE'; value: number }
  | { type: 'SET_LFO_DEPTH'; value: number }
  | { type: 'SET_LFO_TARGET'; value: LFOTarget }
  | { type: 'SET_LFO_ENABLED'; value: boolean }
  | { type: 'SET_MASTER_GAIN'; value: number }
