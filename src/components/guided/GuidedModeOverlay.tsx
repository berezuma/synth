import { motion, AnimatePresence } from 'motion/react'
import { GUIDED_STEPS } from './guided-steps'
import type { GuidedState } from '../../hooks/useGuidedMode'

interface Props {
  state: GuidedState
  onNext: () => void
  onExit: () => void
}

export function GuidedModeOverlay({ state, onNext, onExit }: Props) {
  if (state.mode !== 'guided') return null

  const step = GUIDED_STEPS[state.stepIndex]
  if (!step) return null

  const isComplete = state.completed.has(state.stepIndex)
  const isLastStep = state.stepIndex === GUIDED_STEPS.length - 1

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="bg-nord-1 border border-nord-2 rounded-xl p-4 shadow-2xl">
        {/* Progress dots */}
        <div className="flex gap-2 mb-3">
          {GUIDED_STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < state.stepIndex
                  ? 'bg-nord-14'
                  : i === state.stepIndex
                    ? 'bg-nord-8'
                    : 'bg-nord-2'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-nord-8/20 text-nord-8 flex items-center justify-center text-sm font-bold">
            {step.id}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-nord-4 mb-1">{step.title}</h4>
            <p className="text-[11px] text-nord-3 leading-relaxed">{step.instruction}</p>
          </div>
        </div>

        {/* Completion + actions */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              className="flex items-center justify-between mt-3 pt-3 border-t border-nord-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <span className="text-[11px] text-nord-14 font-semibold">Step complete!</span>
              <div className="flex gap-2">
                <button
                  onClick={onExit}
                  className="px-3 py-1 text-[10px] text-nord-3 hover:text-nord-4 cursor-pointer"
                >
                  Free Play
                </button>
                <button
                  onClick={onNext}
                  className="px-4 py-1.5 bg-nord-8 text-nord-0 rounded-lg text-[11px] font-semibold cursor-pointer"
                >
                  {isLastStep ? 'Finish' : 'Next Step'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint (always visible at bottom) */}
        {!isComplete && (
          <p className="mt-2 text-[9px] text-nord-3/70 italic">
            Hint: {step.hint}
          </p>
        )}
      </div>
    </motion.div>
  )
}
