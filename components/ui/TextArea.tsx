export default function Textarea({
  value,
  onChange,
  placeholder,
}: any) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-4 rounded-lg border border-slate-200"
    />
  )
}