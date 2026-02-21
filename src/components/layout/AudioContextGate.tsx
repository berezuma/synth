import { useState, type ReactNode } from 'react'
import * as Tone from 'tone'
import { motion, AnimatePresence } from 'motion/react'

export function AudioContextGate({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false)

  const handleStart = async () => {
    await Tone.start()
    setStarted(true)
  }

  return (
    <>
      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-nord-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-bold text-nord-8 tracking-tight">
              Synthesis Primer
            </h1>
            <p className="text-nord-3 text-sm max-w-md text-center leading-relaxed">
              An interactive guide to subtractive synthesis.
              <br />
              Click below to enable audio and begin.
            </p>
            <motion.button
              onClick={handleStart}
              className="mt-4 px-8 py-3 bg-nord-8 text-nord-0 rounded-xl text-lg font-semibold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Synthesizer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {started && children}
    </>
  )
}
