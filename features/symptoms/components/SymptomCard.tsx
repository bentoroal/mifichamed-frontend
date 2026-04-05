import { getSymptomIcon} from "@/lib/symptomIcons";

type SymptomCardProps = {
  symptom: any;
  isSelected: boolean;
  onClick: () => void;
};

export default function SymptomCard({
  symptom,
  isSelected,
  onClick,
}: SymptomCardProps) {

    const severityConfig = {
        low: {
            range: [1, 3],
            label: "Leve",
            style: "bg-emerald-100 text-emerald-700",
        },
        medium: {
            range: [4, 6],
            label: "Moderado",
            style: "bg-yellow-100 text-yellow-700",
        },
        high: {
            range: [7, 8],
            label: "Alto",
            style: "bg-orange-100 text-orange-700",
        },
        critical: {
            range: [9, 10],
            label: "Crítico",
            style: "bg-red-100 text-red-700",
        },
        } as const;

    const severity = severityConfig[symptom.severity as keyof typeof severityConfig];

    const Icon = getSymptomIcon(symptom.symptom?.name);

    return (
        <div
          onClick={onClick}
          className={`
            relative p-4 rounded-xl cursor-pointer transition-all border
            group
            ${
                isSelected
                    ? "border-primary bg-white shadow-sm"
                    : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
                }   
            `}
            >

            {/* Barra lateral de selección */} 
            {isSelected && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-r-xl" />
            )}  

            <div className="flex items-start gap-3">

            {/* ICONO */}   
            <div
                className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition
                    ${
                    isSelected
                        ? "bg-emerald-200 text-emerald-700"
                        : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200"
                    }
                `}
                >
                <Icon className="w-5 h-5" />
            </div>

            {/* CONTENIDO */}
            <div className="flex-1 min-w-0">

              <div className="flex justify-between items-start gap-2">

                <h4 className="font-semibold text-slate-800 leading-tight truncate">
                  {symptom.symptom?.name}
                </h4>

                {severity && (
                  <span
                    className={`
                      text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap
                      ${severity.style}
                    `}
                  >
                    {severity.label}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-1">
                {symptom.start_date || "Sin fecha"}
              </p>

            </div>
        </div>
    </div>
    )
}