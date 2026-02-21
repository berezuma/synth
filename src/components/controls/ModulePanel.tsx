import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface ModulePanelProps {
  title: string
  children: ReactNode
  locked?: boolean
  className?: string
}

export function ModulePanel({ title, children, locked = false, className = '' }: ModulePanelProps) {
  return (
    <motion.div
      className={`relative bg-nord-1 rounded-xl border border-nord-2 p-4 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-[11px] uppercase tracking-widest text-nord-3 mb-3 font-semibold">
        {title}
      </h3>
      {children}
      {locked && (
        <motion.div
          className="absolute inset-0 z-10 bg-nord-0/80 backdrop-blur-[2px] flex items-center justify-center rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-nord-3">
            <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}
