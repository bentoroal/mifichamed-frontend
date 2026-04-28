import { TreatmentItem } from "../types"
import TreatmentCard from "./TreatmentCard"

type TreatmentListProps = {
  treatments: TreatmentItem[]
  selected: TreatmentItem | null
  onSelect: (id: number) => void
}

export default function TreatmentList({
  treatments,
  selected,
  onSelect,
}: TreatmentListProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-slate-800">Mis Tratamientos</h2>

      {treatments.length === 0 ? (
        <p className="text-sm text-slate-400">
          Aun no tienes tratamientos registrados.
        </p>
      ) : (
        treatments.map((treatment) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            isSelected={selected?.id === treatment.id}
            onClick={() => onSelect(treatment.id)}
          />
        ))
      )}
    </div>
  )
}
