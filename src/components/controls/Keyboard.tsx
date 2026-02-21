import { useEffect, useRef, useCallback } from 'react'
import { useSynthContext } from '../../context/SynthContext'
import { NOTES, KEYBOARD_NOTE_MAP } from '../../audio/constants'

const WHITE_NOTES = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
const BLACK_NOTE_MAP: Record<string, string> = {
  'C3': 'C#3', 'D3': 'D#3', 'F3': 'F#3', 'G3': 'G#3', 'A3': 'A#3',
  'C4': 'C#4', 'D4': 'D#4', 'F4': 'F#4', 'G4': 'G#4', 'A4': 'A#4',
}

const BLACK_FREQS: Record<string, number> = {
  'C#3': 138.59, 'D#3': 155.56, 'F#3': 185.00, 'G#3': 207.65, 'A#3': 233.08,
  'C#4': 277.18, 'D#4': 311.13, 'F#4': 369.99, 'G#4': 415.30, 'A#4': 466.16,
}

export function Keyboard() {
  const { triggerAttack, triggerRelease } = useSynthContext()
  const activeNote = useRef<string | null>(null)

  const handleNoteOn = useCallback((note: string, freq: number) => {
    activeNote.current = note
    triggerAttack(freq)
  }, [triggerAttack])

  const handleNoteOff = useCallback(() => {
    activeNote.current = null
    triggerRelease()
  }, [triggerRelease])

  // Computer keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      const note = KEYBOARD_NOTE_MAP[e.key.toLowerCase()]
      if (note && NOTES[note]) {
        handleNoteOn(note, NOTES[note])
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const note = KEYBOARD_NOTE_MAP[e.key.toLowerCase()]
      if (note && activeNote.current === note) {
        handleNoteOff()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleNoteOn, handleNoteOff])

  const whiteKeyWidth = 100 / WHITE_NOTES.length

  return (
    <div className="relative w-full h-24 select-none touch-none">
      {/* White keys */}
      <div className="absolute inset-0 flex">
        {WHITE_NOTES.map((note, i) => (
          <button
            key={note}
            className="flex-1 bg-nord-5 border border-nord-2 rounded-b-md transition-colors active:bg-nord-8/30 hover:bg-nord-4 cursor-pointer relative"
            style={{ zIndex: 1 }}
            onPointerDown={() => handleNoteOn(note, NOTES[note])}
            onPointerUp={handleNoteOff}
            onPointerLeave={handleNoteOff}
          >
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-nord-2">
              {i === 0 || note === 'C4' || note === 'C5' ? note : ''}
            </span>
          </button>
        ))}
      </div>
      {/* Black keys */}
      {WHITE_NOTES.map((note, i) => {
        const blackNote = BLACK_NOTE_MAP[note]
        if (!blackNote) return null
        const leftPercent = (i + 0.65) * whiteKeyWidth
        return (
          <button
            key={blackNote}
            className="absolute top-0 h-[60%] bg-nord-0 border border-nord-2 rounded-b-md transition-colors active:bg-nord-1 hover:bg-nord-2 cursor-pointer"
            style={{
              left: `${leftPercent}%`,
              width: `${whiteKeyWidth * 0.65}%`,
              zIndex: 2,
            }}
            onPointerDown={() => handleNoteOn(blackNote, BLACK_FREQS[blackNote])}
            onPointerUp={handleNoteOff}
            onPointerLeave={handleNoteOff}
          />
        )
      })}
    </div>
  )
}
