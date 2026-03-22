export default function Select({
  value,
  onChange,
  options,
  disabled = false,
  error,
}: any) {
  const base =
    "w-full h-11 px-4 rounded-lg border bg-white outline-none transition"

  const normal =
    "border-slate-200 focus:ring-2 focus:ring-[var(--accent-mint)]"

  const errorStyle = "border-red-400 focus:ring-2 focus:ring-red-300"

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={`${base} ${error ? errorStyle : normal}`}
    >
      <option value="">Seleccionar</option>

      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}