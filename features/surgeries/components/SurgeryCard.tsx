import { Bandage } from "lucide-react"

type SurgeryCardProps = {
  surgery: any
  isSelected: boolean
  onClick: () => void
}

export default function SurgeryCard({
  surgery,
  isSelected,
  onClick,
}: SurgeryCardProps) {

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
                        w-10 h-10 rounded-lg flex items-center  justify-center transition
                        ${
                            isSelected
                                ? "bg-emerald-200 text-emerald-700" 
                                : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200"}
                        }
                    `}
                >
                    <Bandage className="w-5 h-5"></Bandage>
                </div>
                {/* CONTENIDO */}
                <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start gap-2">

                        <h4 className="font-semibold text-slate-800 leading-tight truncate">
                            {surgery.surgery?.name || "Sin nombre"}
                        </h4>

                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        {surgery.surgery_date}
                    </p>
                </div>
                </div>
            
        </div>

    )
}