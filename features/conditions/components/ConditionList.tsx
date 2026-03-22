import ConditionCard from "./ConditionCard"
import { getCategoryIcon } from "@/lib/categoryIcons"

export default function ConditionList({ conditions, selected, onSelect }: any) {

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-slate-800">Mis Enfermedades</h2>

      {conditions.map((c: any) => (
        <ConditionCard
          key={c.id}
          condition={c}
          isSelected={selected?.id === c.id}
          onClick={() => onSelect(c)}
        />
      ))}
    </div>
  )
}