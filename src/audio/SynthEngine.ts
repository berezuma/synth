import * as Tone from 'tone'
import type { OscType, LFOTarget } from './types'
import { DEFAULT_PARAMS } from './constants'

export class SynthEngine {
  private osc: Tone.Oscillator
  private filter: Tone.Filter
  private envelope: Tone.AmplitudeEnvelope
  private lfo: Tone.LFO
  private gain: Tone.Gain
  private fftAnalyser: Tone.FFT
  private waveformAnalyser: Tone.Waveform
  private lfoTarget: LFOTarget = 'filter'
  private isStarted = false

  constructor() {
    const p = DEFAULT_PARAMS

    this.osc = new Tone.Oscillator({
      frequency: p.oscFrequency,
      type: p.oscType,
    })

    this.filter = new Tone.Filter({
      frequency: p.filterCutoff,
      type: 'lowpass',
      Q: p.filterQ,
    })

    this.envelope = new Tone.AmplitudeEnvelope({
      attack: p.attack,
      decay: p.decay,
      sustain: p.sustain,
      release: p.release,
    })

    this.gain = new Tone.Gain(p.masterGain)

    this.lfo = new Tone.LFO({
      frequency: p.lfoRate,
      min: 200,
      max: 4000,
    })

    this.fftAnalyser = new Tone.FFT(2048)
    this.waveformAnalyser = new Tone.Waveform(2048)

    // Signal chain: Osc -> Filter -> Envelope -> Gain -> Analysers + Destination
    this.osc.chain(this.filter, this.envelope, this.gain)
    this.gain.connect(this.fftAnalyser)
    this.gain.connect(this.waveformAnalyser)
    this.gain.toDestination()

    // LFO -> Filter frequency by default
    this.lfo.connect(this.filter.frequency)
  }

  start() {
    if (!this.isStarted) {
      this.osc.start()
      this.isStarted = true
    }
  }

  stop() {
    if (this.isStarted) {
      this.osc.stop()
      this.isStarted = false
    }
  }

  triggerAttack() {
    if (!this.isStarted) this.start()
    this.envelope.triggerAttack()
  }

  triggerRelease() {
    this.envelope.triggerRelease()
  }

  triggerAttackRelease(duration: string | number = '8n') {
    if (!this.isStarted) this.start()
    this.envelope.triggerAttackRelease(duration)
  }

  setFrequency(freq: number) {
    this.osc.frequency.rampTo(freq, 0.01)
  }

  // --- Oscillator ---
  setOscType(type: OscType) {
    this.osc.type = type
  }

  setOscFrequency(freq: number) {
    this.osc.frequency.rampTo(freq, 0.01)
  }

  // --- Filter ---
  setFilterCutoff(freq: number) {
    this.filter.frequency.rampTo(freq, 0.01)
  }

  setFilterQ(q: number) {
    this.filter.Q.rampTo(q, 0.01)
  }

  // --- ADSR ---
  setAttack(v: number) { this.envelope.attack = v }
  setDecay(v: number) { this.envelope.decay = v }
  setSustain(v: number) { this.envelope.sustain = v }
  setRelease(v: number) { this.envelope.release = v }

  // --- LFO ---
  setLFORate(rate: number) {
    this.lfo.frequency.rampTo(rate, 0.01)
  }

  setLFODepth(depth: number) {
    // depth 0..1 maps to narrow..wide range around filter cutoff
    const center = 1000
    const range = depth * 3000
    this.lfo.min = Math.max(20, center - range)
    this.lfo.max = Math.min(20000, center + range)
  }

  setLFOEnabled(enabled: boolean) {
    if (enabled) {
      this.lfo.start()
    } else {
      this.lfo.stop()
    }
  }

  setLFOTarget(target: LFOTarget) {
    this.lfo.disconnect()
    this.lfoTarget = target
    if (target === 'filter') {
      this.lfo.connect(this.filter.frequency)
    } else {
      this.lfo.connect(this.osc.frequency)
    }
  }

  // --- Master ---
  setMasterGain(v: number) {
    this.gain.gain.rampTo(v, 0.01)
  }

  // --- Analysers (called from rAF loop, not React) ---
  getFFTValues(): Float32Array {
    return this.fftAnalyser.getValue() as Float32Array
  }

  getWaveformValues(): Float32Array {
    return this.waveformAnalyser.getValue() as Float32Array
  }

  dispose() {
    this.osc.dispose()
    this.filter.dispose()
    this.envelope.dispose()
    this.lfo.dispose()
    this.gain.dispose()
    this.fftAnalyser.dispose()
    this.waveformAnalyser.dispose()
  }
}
