import { AllergyItem } from "../types"
import AllergyCard from "./AllergyCard"

type AllergyListProps = {
  allergies: AllergyItem[]
  selected: AllergyItem | null
  onSelect: (id: number) => void
}

export default function AllergyList({
  allergies,
  selected,
  onSelect,
}: AllergyListProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-slate-800">Mis Alergias</h2>

      {allergies.length === 0 ? (
        <p className="text-sm text-slate-400">
          Aun no tienes alergias registradas.
        </p>
      ) : (
        allergies.map((allergy) => (
          <AllergyCard
            key={allergy.id}
            allergy={allergy}
            isSelected={selected?.id === allergy.id}
            onClick={() => onSelect(allergy.id)}
          />
        ))
      )}
    </div>
  )
}
