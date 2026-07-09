import { type LucideIcon } from "lucide-react"

export type HabitCardTone = "green" | "yellow" | "orange" | "red" | "slate"

const toneStyles: Record<
  HabitCardTone,
  {
    card: string
    icon: string
    label: string
    value: string
  }
> = {
  green: {
    card: "border-emerald-100 bg-emerald-50/40",
    icon: "bg-white text-emerald-700 shadow-sm",
    label: "text-emerald-700",
    value: "text-slate-900",
  },
  yellow: {
    card: "border-yellow-100 bg-yellow-50/40",
    icon: "bg-white text-yellow-700 shadow-sm",
    label: "text-yellow-700",
    value: "text-slate-900",
  },
  orange: {
    card: "border-orange-100 bg-orange-50/40",
    icon: "bg-white text-orange-700 shadow-sm",
    label: "text-orange-700",
    value: "text-slate-900",
  },
  red: {
    card: "border-red-100 bg-red-50/40",
    icon: "bg-white text-red-700 shadow-sm",
    label: "text-red-700",
    value: "text-slate-900",
  },
  slate: {
    card: "border-slate-200 bg-slate-50",
    icon: "bg-white text-slate-600 shadow-sm",
    label: "text-slate-700",
    value: "text-slate-900",
  },
}

export default function HabitCard({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string
  value: string
  tone: HabitCardTone
  icon: LucideIcon
}) {
  const styles = toneStyles[tone]

  return (
    <div
      className={[
        "flex h-full min-h-[72px] items-center gap-3 rounded-xl border p-3",
        styles.card,
      ].join(" ")}
    >
      <div
        className={[
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          styles.icon,
        ].join(" ")}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className={["truncate text-[11px] font-bold uppercase tracking-[0.2em]", styles.label].join(" ")}>
          {label}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
          <span className={["text-lg font-black leading-tight", styles.value].join(" ")}>
            {value}
          </span>
        </div>
      </div>
    </div>
  )
}
