import { ShieldAlert } from "lucide-react"
import { AllergyItem } from "../types"

type AllergyCardProps = {
  allergy: AllergyItem
  isSelected: boolean
  onClick: () => void
}

export default function AllergyCard({
  allergy,
  isSelected,
  onClick,
}: AllergyCardProps) {
  const statusLabel = allergy.status === "remission" ? "Remision" : "Activa"

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
                ? "bg-amber-200 text-amber-700"
                : "bg-amber-100 text-amber-600 group-hover:bg-amber-200"
            }
          `}
        >
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-semibold text-slate-800 leading-tight truncate">
              {allergy.allergy?.name || "Sin nombre"}
            </h4>

            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap bg-amber-100 text-amber-700">
              {statusLabel}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {allergy.start_date || allergy.notes || "Sin fecha registrada"}
          </p>
        </div>
      </div>
    </div>
  )
}
