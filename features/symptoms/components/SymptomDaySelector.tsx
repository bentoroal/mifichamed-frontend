import { format, subDays, isToday } from "date-fns"
import { es } from "date-fns/locale"

export default function SymptomDaySelector({
  startDate,
  endDate,
  selectedDate,
  onSelect,
}: any) {
  if (!startDate) return null

  const today = new Date()
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : today

  const days = []
  let current = end

  while (current >= start) {
    days.push(new Date(current))
    current = subDays(current, 1)
  }
    // Invertimos para mostrar del más antiguo al más reciente
    days.reverse()

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, i) => {
        const isSelected =
          selectedDate?.toDateString() === day.toDateString()

        return (
          <button
            key={i}
            onClick={() => onSelect(day)}
            className={`
              w-full flex flex-col items-center p-2 rounded-lg border transition
              ${
                isSelected
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-muted border-transparent hover:border-secondary"
              }
            `}
          >
            <span
              className={`text-[10px] font-medium ${
                isSelected ? "text-white/80" : "text-slate-500"
              }`}
            >
              {isToday(day)
                ? "HOY"
                : format(day, "EEE", {locale: es}).toUpperCase()}
            </span>

            <span className="text-sm font-bold">
              {format(day, "d", {locale: es})}
            </span>
          </button>
        )
      })}
    </div>
  )
}
