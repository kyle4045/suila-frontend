import { useState, type Dispatch, type SetStateAction } from "react"
import { Card } from "../components/Card"
import { SaveButton } from "../components/SaveButton"
import { ScreenHeader } from "../components/ScreenHeader"
import { conditionOptions, type ConditionId, type Profile } from "../data/mock"
import { useT } from "../i18n"

export function ProfileScreen({
  profile,
  onChange,
  onClose,
}: {
  profile: Profile
  onChange: Dispatch<SetStateAction<Profile>>
  onClose: () => void
}) {
  const t = useT()
  const [conditionMenuOpen, setConditionMenuOpen] = useState(false)
  const { conditions } = profile

  const toggleCondition = (condition: ConditionId) => {
    onChange((current) => {
      if (condition === "none") {
        return {
          ...current,
          conditions: current.conditions.includes("none") ? [] : ["none"],
        }
      }

      const withoutNone = current.conditions.filter((item) => item !== "none")
      return {
        ...current,
        conditions: withoutNone.includes(condition)
          ? withoutNone.filter((item) => item !== condition)
          : [...withoutNone, condition],
      }
    })
  }

  return (
    <section className="settings-screen" aria-label={t.profile.aria}>
      <ScreenHeader
        className="settings-header"
        closeLabel={t.profile.close}
        onClose={onClose}
      />

      <div className="settings-content">
        <Card className="settings-profile-card">
          <div className="profile-form">
            <label>
              <span>{t.profile.name}</span>
              <input
                value={profile.name}
                onChange={(event) =>
                  onChange((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder={t.profile.namePlaceholder}
              />
            </label>
            <div className="profile-form-row">
              <label>
                <span>{t.profile.height}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={profile.heightCm}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      heightCm: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                <span>{t.profile.weight}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={profile.weightKg}
                  onChange={(event) =>
                    onChange((current) => ({
                      ...current,
                      weightKg: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
          </div>
        </Card>

        <Card className="condition-select-card">
          <label>
            <span>{t.profile.conditions}</span>
            <button
              className="condition-select-button"
              type="button"
              aria-expanded={conditionMenuOpen}
              onClick={() => setConditionMenuOpen((open) => !open)}
            >
              <span>
                {conditions.length > 0
                  ? conditions
                      .map((item) => t.profile.conditionLabels[item])
                      .join(t.common.listSeparator)
                  : t.profile.choose}
              </span>
              <b aria-hidden="true">{conditionMenuOpen ? "▲" : "▼"}</b>
            </button>
          </label>

          {conditionMenuOpen && (
            <div className="condition-options">
              {conditionOptions.map((condition) => (
                <label key={condition}>
                  <input
                    type="checkbox"
                    checked={conditions.includes(condition)}
                    onChange={() => toggleCondition(condition)}
                  />
                  <span>{t.profile.conditionLabels[condition]}</span>
                </label>
              ))}
            </div>
          )}
        </Card>
      </div>

      <SaveButton onClick={onClose} />
    </section>
  )
}
