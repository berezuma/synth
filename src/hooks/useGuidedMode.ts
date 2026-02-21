import { useReducer, useCallback, useEffect, useRef } from 'react'
import type { SynthParams } from '../audio/types'
import {
  GUIDED_STEPS,
  INITIAL_HISTORY,
  type GuidedHistory,
} from '../components/guided/guided-steps'

export interface GuidedState {
  mode: 'free' | 'guided'
  stepIndex: number
  completed: Set<number>
  history: GuidedHistory
  justCompleted: number | null // for animation
}

type GuidedAction =
  | { type: 'START_GUIDED' }
  | { type: 'EXIT_GUIDED' }
  | { type: 'COMPLETE_STEP'; stepIndex: number }
  | { type: 'NEXT_STEP' }
  | { type: 'CLEAR_COMPLETION' }
  | { type: 'UPDATE_HISTORY'; params: SynthParams }

const initialState: GuidedState = {
  mode: 'free',
  stepIndex: 0,
  completed: new Set(),
  history: { ...INITIAL_HISTORY },
  justCompleted: null,
}

function guidedReducer(state: GuidedState, action: GuidedAction): GuidedState {
  switch (action.type) {
    case 'START_GUIDED':
      return {
        ...initialState,
        mode: 'guided',
      }
    case 'EXIT_GUIDED':
      return { ...state, mode: 'free', justCompleted: null }
    case 'COMPLETE_STEP': {
      const completed = new Set(state.completed)
      completed.add(action.stepIndex)
      return { ...state, completed, justCompleted: action.stepIndex }
    }
    case 'NEXT_STEP': {
      const next = state.stepIndex + 1
      if (next >= GUIDED_STEPS.length) {
        return { ...state, mode: 'free', justCompleted: null }
      }
      return { ...state, stepIndex: next, justCompleted: null }
    }
    case 'CLEAR_COMPLETION':
      return { ...state, justCompleted: null }
    case 'UPDATE_HISTORY': {
      const p = action.params
      const h = { ...state.history }

      // Track filter sweep range
      h.filterCutoffMin = Math.min(h.filterCutoffMin, p.filterCutoff)
      h.filterCutoffMax = Math.max(h.filterCutoffMax, p.filterCutoff)

      // Track staccato: short attack+decay, low sustain
      if (p.attack < 0.05 && p.decay < 0.3 && p.sustain < 0.3) {
        h.triedStaccato = true
      }

      // Track swell: long attack, high sustain
      if (p.attack > 0.5 && p.sustain > 0.7) {
        h.triedSwell = true
      }

      return { ...state, history: h }
    }
    default:
      return state
  }
}

export function useGuidedMode(params: SynthParams) {
  const [state, dispatch] = useReducer(guidedReducer, initialState)
  const prevCompletedRef = useRef(false)

  // Update history when params change
  useEffect(() => {
    if (state.mode === 'guided') {
      dispatch({ type: 'UPDATE_HISTORY', params })
    }
  }, [params, state.mode])

  // Check completion condition
  useEffect(() => {
    if (state.mode !== 'guided') return
    const step = GUIDED_STEPS[state.stepIndex]
    if (!step) return
    if (state.completed.has(state.stepIndex)) return

    const isComplete = step.completionCondition(params, state.history)
    if (isComplete && !prevCompletedRef.current) {
      dispatch({ type: 'COMPLETE_STEP', stepIndex: state.stepIndex })
    }
    prevCompletedRef.current = isComplete
  }, [params, state.mode, state.stepIndex, state.history, state.completed])

  const startGuided = useCallback(() => dispatch({ type: 'START_GUIDED' }), [])
  const exitGuided = useCallback(() => dispatch({ type: 'EXIT_GUIDED' }), [])
  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), [])

  return { state, startGuided, exitGuided, nextStep }
}
