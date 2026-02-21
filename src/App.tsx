import { AudioContextGate } from './components/layout/AudioContextGate'
import { SynthProvider } from './context/SynthContext'
import { SynthLayout } from './components/layout/SynthLayout'

export default function App() {
  return (
    <AudioContextGate>
      <SynthProvider>
        <SynthLayout />
      </SynthProvider>
    </AudioContextGate>
  )
}
