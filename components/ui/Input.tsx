export default function Input({
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
}: any) {
  const base =
    "w-full h-11 px-4 rounded-lg border bg-white outline-none transition"

  const normal =
    "border-slate-200 focus:ring-2 focus:ring-[var(--accent-mint)]"

  const errorStyle = "border-red-400 focus:ring-2 focus:ring-red-300"

  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={`${base} ${error ? errorStyle : normal} ${
        disabled ? "bg-slate-100 text-slate-400" : ""
      }`}
    />
  )
}