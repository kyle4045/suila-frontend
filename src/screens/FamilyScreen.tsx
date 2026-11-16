import { Card } from "../components/Card"
import { freeFamilyLimit, type FamilyMember } from "../data/mock"
import { useT } from "../i18n"

export function FamilyScreen({
  connected,
  members,
  onConnect,
  onAddMember,
}: {
  connected: boolean
  members: FamilyMember[]
  onConnect: () => void
  onAddMember: () => void
}) {
  const t = useT()

  if (!connected) {
    return (
      <section className="swipe-page social-page" aria-label={t.family.aria}>
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
      <Card className="line-connections-card">
        <div className="line-connected-heading">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>{t.family.connectedHeading(members.length)}</strong>
          </div>
        </div>
        <div className="connected-people-list">
          {members.map((member) => {
            const person = t.family.people[member.id]
            return (
              <div className="connected-person" key={member.id}>
                <span
                  className={`person-avatar ${member.color}`}
                  aria-hidden="true"
                >
                  {person.initial}
                </span>
                <strong>
                  {t.family.personLabel(person.relation, person.name)}
                </strong>
              </div>
            )
          })}
        </div>
      </Card>

      <button className="my-menu-row" type="button" onClick={onAddMember}>
        <div>
          <strong>{t.family.addMember}</strong>
          <small>{t.family.addMemberHint(freeFamilyLimit)}</small>
        </div>
        <span aria-hidden="true">＞</span>
      </button>
    </section>
  )
}
