import { Pill } from "lucide-react"
import { TreatmentItem } from "../types"

type TreatmentCardProps = {
  treatment: TreatmentItem
  isSelected: boolean
  onClick: () => void
}

export default function TreatmentCard({
  treatment,
  isSelected,
  onClick,
}: TreatmentCardProps) {
  const medicationLabel = treatment.medication?.name
    || (treatment.medication_id ? `Medicamento #${treatment.medication_id}` : "Sin medicamento")
  const conditionStatusLabel = treatment.conditionStatus || "Asociado"

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all border group
        ${
          isSelected
            ? "border-primary bg-white shadow-sm"
            : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
        }
      `}
    >
      {isSelected && (
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-r-xl" />
      )}

      <div className="flex items-start gap-3">
        <div
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition
            ${
              isSelected
                ? "bg-emerald-200 text-emerald-700"
                : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200"
            }
          `}
        >
          <Pill className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-slate-800 leading-tight truncate">
              {medicationLabel}
            </h4>

            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap bg-emerald-100 text-emerald-700">
              {conditionStatusLabel}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1 truncate">
            {treatment.conditionName || "Sin condicion asociada"}
          </p>
        </div>
      </div>
    </div>
  )
}
