export default function MetricCard({ label, value, unit, status }: any) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-slate-800">{value}</span>
        <span className="text-sm font-medium text-slate-500">{unit}</span>
        {status && (
          <span className="ml-1 text-sm font-medium text-teal-500 bg-teal-50 px-1.5 rounded">
            {status}
          </span>
        )}
      </div>
    </div>
  );
}