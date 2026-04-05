import { getCategoryIcon } from "@/lib/categoryIcons"

type ConditionCardProps = {
  condition: any
  isSelected: boolean
  onClick: () => void
}

export default function ConditionCard({
  condition,
  isSelected,
  onClick,
}: ConditionCardProps) {

  const statusConfig = {
    active: {
      label: "Activa",
      style: "bg-emerald-100 text-emerald-700",
    },
    chronic: {
      label: "Crónica",
      style: "bg-amber-100 text-amber-700",
    },
    resolved: {
      label: "Resuelta",
      style: "bg-slate-100 text-slate-600",
    },
    remission: {
      label: "Remisión",
      style: "bg-blue-100 text-blue-700",
    },
  } as const

  const status = statusConfig[condition.status as keyof typeof statusConfig]

  const Icon = getCategoryIcon(condition.condition?.category)

  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 rounded-xl cursor-pointer transition-all border
        group
        ${
          isSelected
            ? "border-primary bg-white shadow-sm"
            : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
        }
      `}
    >
      {/* Barra lateral de selección */}
      {isSelected && (
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-r-xl" />
      )}

      <div className="flex items-start gap-3">

        {/* ICONO */}
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
          <Icon className="w-5 h-5" />
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 min-w-0">

          <div className="flex justify-between items-start gap-2">

            <h4 className="font-semibold text-slate-800 leading-tight truncate">
              {condition.condition?.name}
            </h4>

            {status && (
              <span
                className={`
                  text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap
                  ${status.style}
                `}
              >
                {status.label}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {condition.start_date || "Sin fecha"}
          </p>

        </div>
      </div>
    </div>
  )
}