import { Scale } from "lucide-react"

export default function BioMetricCard({
  label,
  value,
  unit,
  status,
  icon: Icon,
}: {
  label: string
  value: number | string
  unit?: string
  status?: string
  icon: typeof Scale
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/40 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold uppercase tracking-wider text-teal-700">
          {label}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
          <span className="text-xl font-black leading-tight text-slate-900">
            {value}
          </span>
          {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
          {status && (
            <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-teal-700">
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}