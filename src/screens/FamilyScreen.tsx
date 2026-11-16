import { Card } from "../components/Card"
import type { FamilyMember } from "../data/mock"
import { useT } from "../i18n"

export function FamilyScreen({ members }: { members: FamilyMember[] }) {
  const t = useT()

  return (
    <section className="swipe-page social-page" aria-label={t.family.aria}>
      <button className="line-join-button" type="button">
        <strong>{t.family.joinLine}</strong>
      </button>

      <Card className="line-connections-card">
        <div className="line-connected-heading">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>{t.family.lineConnected}</strong>
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
    </section>
  )
}
