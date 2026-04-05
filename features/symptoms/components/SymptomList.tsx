import SymptomCard from "./SymptomCard";

export default function SymptomList({ symptoms, selected, onSelect }: any) {

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Mis Síntomas</h2>

            {symptoms.map((s: any) => (
                <SymptomCard
                    key={s.id}
                    symptom={s}
                    isSelected={selected?.id === s.id}
                    onClick={() => onSelect(s.id)} 
                />
            ))}
        </div>
    )
}