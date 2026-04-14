import SurgeryCard from "./SurgeryCard";

export default function SurgeryList({surgeries, selected, onSelect }: any){

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Mis Cirugías</h2>

            {surgeries.map((s: any) => (
                <SurgeryCard
                    key={s.id}
                    surgery={s}
                    isSelected={selected === s.id}
                    onClick={() => onSelect(s.id)}
                />
            ))}
        </div>
    )   
}

