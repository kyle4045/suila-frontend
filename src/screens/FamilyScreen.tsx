import { Card } from "../components/Card"
import { PlayIcon, StopIcon } from "../components/Icons"
import {
  freeFamilyLimit,
  type FamilyMember,
  type VoiceMessage,
} from "../data/mock"
import { useT } from "../i18n"
import { isToday } from "../lib/date"

export function FamilyScreen({
  connected,
  members,
  messages,
  playingId,
  onConnect,
  isPro,
  onAddMember,
  onPlay,
  onStop,
}: {
  connected: boolean
  members: FamilyMember[]
  messages: VoiceMessage[]
  playingId: string | null
  onConnect: () => void
  isPro: boolean
  onAddMember: () => void
  onPlay: (message: VoiceMessage) => void
  onStop: () => void
}) {
  const t = useT()
  const nameOf = (id: FamilyMember["id"]) => {
    const person = t.family.people[id]
    return t.family.personLabel(person.relation, person.name)
  }

  if (!connected) {
    return (
      <section className="swipe-page social-page" aria-label={t.family.aria}>
        <div className="hero-blue tab-band">
          <p className="band-title">{t.nav.family}</p>
          <p className="band-sub">{t.family.bandNotConnected}</p>
        </div>
        <Card className="family-intro-card">
          <p>{t.family.notConnectedIntro}</p>
        </Card>
        <button className="line-join-button" type="button" onClick={onConnect}>
          <strong>{t.family.joinLine}</strong>
        </button>
      </section>
    )
  }

  return (
    <section className="swipe-page social-page" aria-label={t.family.aria}>
      <div className="hero-blue tab-band">
        <p className="band-title">{t.nav.family}</p>
        <p className="band-sub">{t.family.connectedHeading(members.length)}</p>
      </div>
      <Card className="voice-card">
        <p className="card-label">{t.family.voiceTitle}</p>
        {messages.length === 0 && (
          <p className="voice-empty">{t.family.noMessages}</p>
        )}
        {messages.map((message) => {
          const playing = playingId === message.id
          const sender = nameOf(message.from)
          const date = new Date(message.time)
          return (
            <div className="voice-row" key={message.id}>
              <button
                className="play-button"
                type="button"
                aria-label={
                  playing ? t.family.stopAria(sender) : t.family.playAria(sender)
                }
                onClick={() => (playing ? onStop() : onPlay(message))}
              >
                {playing ? <StopIcon /> : <PlayIcon />}
                {playing ? t.family.stop : t.family.play}
              </button>
              <div className="voice-info">
                <strong>
                  {sender}
                  {!message.played && (
                    <b className="new-tag">{t.family.newTag}</b>
                  )}
                </strong>
                <span>{t.common.dayTime(date, isToday(date))}</span>
                <span>{t.family.duration(message.durationSec)}</span>
              </div>
            </div>
          )
        })}
      </Card>

      <Card className="line-connections-card">
        <p className="card-label">{t.family.listTitle}</p>
        <div className="connected-people-list">
          {members.map((member) => (
            <div className="connected-person" key={member.id}>
              <span
                className={`person-avatar ${member.color}`}
                aria-hidden="true"
              >
                {t.family.people[member.id].initial}
              </span>
              <strong>{nameOf(member.id)}</strong>
            </div>
          ))}
        </div>
      </Card>

      <button className="my-menu-row" type="button" onClick={onAddMember}>
        <div>
          <strong>{t.family.addMember}</strong>
          <small>
            {isPro ? t.family.addMemberHintPro : t.family.addMemberHint(freeFamilyLimit)}
          </small>
        </div>
        <span aria-hidden="true">＞</span>
      </button>
    </section>
  )
}
