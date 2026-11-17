import { useEffect, useRef, useState } from "react"

// Real messages play their recording (audioUrl from the backend). Sample
// messages have no recording, so the browser's built-in voice reads them.
export function useVoicePlayer() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const audio = useRef<HTMLAudioElement | null>(null)

  const stop = () => {
    window.speechSynthesis?.cancel()
    audio.current?.pause()
    audio.current = null
    window.clearTimeout(timer.current)
    setPlayingId(null)
  }

  const play = (
    id: string,
    text: string,
    lang: string,
    durationSec: number,
    audioUrl?: string,
  ) => {
    stop()
    setPlayingId(id)
    const done = () => setPlayingId((current) => (current === id ? null : current))
    if (audioUrl) {
      const player = new Audio(audioUrl)
      audio.current = player
      player.onended = done
      player.onerror = done
      // A blocked or broken recording ends the "playing" state instead of hanging.
      player.play().catch(done)
      return
    }
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
