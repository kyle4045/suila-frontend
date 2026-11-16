import { useEffect, useRef, useState } from "react"

// shortcut: messages are read aloud by the browser's built-in voice, so the
// demo needs no audio files. Swap for real recordings (an <audio> element per
// message) when the group has them.
export function useVoicePlayer() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const stop = () => {
    window.speechSynthesis?.cancel()
    window.clearTimeout(timer.current)
    setPlayingId(null)
  }

  const play = (id: string, text: string, lang: string, durationSec: number) => {
    stop()
    setPlayingId(id)
    const done = () => setPlayingId((current) => (current === id ? null : current))
    const canSpeak = "speechSynthesis" in window
    if (canSpeak) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.onend = done
      utterance.onerror = done
      window.speechSynthesis.speak(utterance)
    }
    // Some browsers never report the end of speech (or cannot speak at all),
    // so the button always resets on its own.
    timer.current = window.setTimeout(done, (durationSec + (canSpeak ? 5 : 0)) * 1000)
  }

  // Stop talking if the app goes away mid-message.
  useEffect(() => stop, [])

  return { playingId, play, stop }
}
