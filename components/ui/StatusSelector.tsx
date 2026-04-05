export default function StatusSelector({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      {options.map((s) => {
        const selected = value === s.value

        return (
          <button
            key={s.value}
            type="button"
            onClick={() => onChange(s.value)}
            className={`h-12 rounded-xl border-2 text-sm transition
              ${
                selected
                  ? "border-primary bg-muted text-primary"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }
            `}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}