import { useRef, useReducer, useCallback, useEffect } from 'react'
import { SynthEngine } from '../audio/SynthEngine'
import { DEFAULT_PARAMS } from '../audio/constants'
import type { SynthParams, SynthAction, OscType, LFOTarget } from '../audio/types'

function synthReducer(state: SynthParams, action: SynthAction): SynthParams {
  switch (action.type) {
    case 'SET_OSC_TYPE': return { ...state, oscType: action.value }
    case 'SET_OSC_FREQUENCY': return { ...state, oscFrequency: action.value }
    case 'SET_FILTER_CUTOFF': return { ...state, filterCutoff: action.value }
    case 'SET_FILTER_Q': return { ...state, filterQ: action.value }
    case 'SET_ATTACK': return { ...state, attack: action.value }
    case 'SET_DECAY': return { ...state, decay: action.value }
    case 'SET_SUSTAIN': return { ...state, sustain: action.value }
    case 'SET_RELEASE': return { ...state, release: action.value }
    case 'SET_LFO_RATE': return { ...state, lfoRate: action.value }
    case 'SET_LFO_DEPTH': return { ...state, lfoDepth: action.value }
    case 'SET_LFO_TARGET': return { ...state, lfoTarget: action.value }
    case 'SET_LFO_ENABLED': return { ...state, lfoEnabled: action.value }
    case 'SET_MASTER_GAIN': return { ...state, masterGain: action.value }
    default: return state
  }
}

export function useSynth() {
  const engineRef = useRef<SynthEngine | null>(null)
  const [params, dispatch] = useReducer(synthReducer, DEFAULT_PARAMS)

  useEffect(() => {
    const engine = new SynthEngine()
    engineRef.current = engine
    return () => {
      engine.dispose()
      engineRef.current = null
    }
  }, [])

  const setOscType = useCallback((type: OscType) => {
    dispatch({ type: 'SET_OSC_TYPE', value: type })
    engineRef.current?.setOscType(type)
  }, [])

  const setOscFrequency = useCallback((freq: number) => {
    dispatch({ type: 'SET_OSC_FREQUENCY', value: freq })
    engineRef.current?.setOscFrequency(freq)
  }, [])

  const setFilterCutoff = useCallback((freq: number) => {
    dispatch({ type: 'SET_FILTER_CUTOFF', value: freq })
    engineRef.current?.setFilterCutoff(freq)
  }, [])

  const setFilterQ = useCallback((q: number) => {
    dispatch({ type: 'SET_FILTER_Q', value: q })
    engineRef.current?.setFilterQ(q)
  }, [])

  const setAttack = useCallback((v: number) => {
    dispatch({ type: 'SET_ATTACK', value: v })
    engineRef.current?.setAttack(v)
  }, [])

  const setDecay = useCallback((v: number) => {
    dispatch({ type: 'SET_DECAY', value: v })
    engineRef.current?.setDecay(v)
  }, [])

  const setSustain = useCallback((v: number) => {
    dispatch({ type: 'SET_SUSTAIN', value: v })
    engineRef.current?.setSustain(v)
  }, [])

  const setRelease = useCallback((v: number) => {
    dispatch({ type: 'SET_RELEASE', value: v })
    engineRef.current?.setRelease(v)
  }, [])

  const setLFORate = useCallback((rate: number) => {
    dispatch({ type: 'SET_LFO_RATE', value: rate })
    engineRef.current?.setLFORate(rate)
  }, [])

  const setLFODepth = useCallback((depth: number) => {
    dispatch({ type: 'SET_LFO_DEPTH', value: depth })
    engineRef.current?.setLFODepth(depth)
  }, [])

  const setLFOTarget = useCallback((target: LFOTarget) => {
    dispatch({ type: 'SET_LFO_TARGET', value: target })
    engineRef.current?.setLFOTarget(target)
  }, [])

  const setLFOEnabled = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_LFO_ENABLED', value: enabled })
    engineRef.current?.setLFOEnabled(enabled)
  }, [])

  const setMasterGain = useCallback((v: number) => {
    dispatch({ type: 'SET_MASTER_GAIN', value: v })
    engineRef.current?.setMasterGain(v)
  }, [])

  const triggerAttack = useCallback((freq?: number) => {
    if (freq) engineRef.current?.setFrequency(freq)
    engineRef.current?.triggerAttack()
  }, [])

  const triggerRelease = useCallback(() => {
    engineRef.current?.triggerRelease()
  }, [])

  const getFFTValues = useCallback(() => {
    return engineRef.current?.getFFTValues() ?? new Float32Array(0)
  }, [])

  const getWaveformValues = useCallback(() => {
    return engineRef.current?.getWaveformValues() ?? new Float32Array(0)
  }, [])

  return {
    params,
    engineRef,
    setOscType,
    setOscFrequency,
    setFilterCutoff,
    setFilterQ,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
    setLFORate,
    setLFODepth,
    setLFOTarget,
    setLFOEnabled,
    setMasterGain,
    triggerAttack,
    triggerRelease,
    getFFTValues,
    getWaveformValues,
  }
}

export type UseSynthReturn = ReturnType<typeof useSynth>
