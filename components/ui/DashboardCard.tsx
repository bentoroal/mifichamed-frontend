import { Plus } from "lucide-react";

export default function DashboardCard({ title, icon: Icon, iconColor, children, footerAction }: any) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-teal-50 pb-4">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          {title}
        </h3>
        <button className="flex items-center gap-1 rounded-lg bg-teal-500/10 px-2 py-1 text-xs font-bold text-teal-700 hover:bg-teal-500/20 transition-colors">
          <Plus className="w-3 h-3" /> Añadir
        </button>
      </div>
      <div className="space-y-4">{children}</div>
      {footerAction && (
        <button className="w-full text-center text-sm font-bold text-teal-600 hover:text-teal-700 py-2 mt-2">
          {footerAction}
        </button>
      )}
    </div>
  );
}