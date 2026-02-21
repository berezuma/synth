import { useMemo } from 'react'
import { useSynthContext } from '../../context/SynthContext'
import { useGuidedMode } from '../../hooks/useGuidedMode'
import { GUIDED_STEPS, type ModuleId } from '../guided/guided-steps'
import { Header } from './Header'
import { OscillatorControls } from '../modules/OscillatorControls'
import { FilterSection } from '../modules/FilterSection'
import { ADSRGraph } from '../modules/ADSRGraph'
import { LFOControls } from '../modules/LFOControls'
import { VisualizerPanel } from '../visualizers/VisualizerPanel'
import { Keyboard } from '../controls/Keyboard'
import { GuidedModeOverlay } from '../guided/GuidedModeOverlay'

export function SynthLayout() {
  const { params } = useSynthContext()
  const { state: guided, startGuided, exitGuided, nextStep } = useGuidedMode(params)

  const isLocked = useMemo(() => {
    if (guided.mode !== 'guided') {
      return (_id: ModuleId) => false
    }
    const step = GUIDED_STEPS[guided.stepIndex]
    if (!step) return (_id: ModuleId) => false
    const unlocked = new Set(step.unlockedModules)
    return (id: ModuleId) => !unlocked.has(id)
  }, [guided.mode, guided.stepIndex])

  const handleToggleGuided = () => {
    if (guided.mode === 'guided') {
      exitGuided()
    } else {
      startGuided()
    }
  }

  return (
    <div className="min-h-screen bg-nord-0 flex flex-col">
      <Header guidedMode={guided.mode === 'guided'} onToggleGuided={handleToggleGuided} />

      <main className="flex-1 p-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <OscillatorControls locked={isLocked('oscillator')} />
          <FilterSection locked={isLocked('filter')} />
          <ADSRGraph locked={isLocked('adsr')} />
          <LFOControls locked={isLocked('lfo')} />
          <VisualizerPanel />
          <div className="col-span-full lg:col-span-2">
            <div className="bg-nord-1 rounded-xl border border-nord-2 p-4">
              <h3 className="text-[11px] uppercase tracking-widest text-nord-3 mb-3 font-semibold">
                Keyboard
              </h3>
              <Keyboard />
              <p className="mt-2 text-[9px] text-nord-3">
                Click keys or use your keyboard: A-L (lower octave), Q-I (upper octave)
              </p>
            </div>
          </div>
        </div>
      </main>

      <GuidedModeOverlay state={guided} onNext={nextStep} onExit={exitGuided} />
    </div>
  )
}
