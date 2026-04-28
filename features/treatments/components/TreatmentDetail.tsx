"use client"

import { useState } from "react"
import { Pill, Trash2 } from "lucide-react"
import { TreatmentItem } from "../types"
import TreatmentModal from "./TreatmentModal"

const statusLabel: Record<string, string> = {
  active: "Activa",
  chronic: "Cronica",
  resolved: "Resuelta",
  remission: "En remision",
}

type TreatmentDetailProps = {
  treatment: TreatmentItem | null
  refresh: () => Promise<void>
  onDelete?: (id: number) => void
}

export default function TreatmentDetail({
  treatment,
  refresh,
  onDelete,
}: TreatmentDetailProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  if (!treatment) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-slate-400">
        Selecciona un tratamiento para ver el detalle
      </div>
    )
  }

  const medicationLabel = treatment.medication?.name
    || (treatment.medication_id ? `Medicamento #${treatment.medication_id}` : "Sin medicamento asociado")
  const conditionStatus = treatment.conditionStatus ?? ""

  return (
    <>
      <TreatmentModal
        key={`${treatment.id}-${isEditOpen ? "open" : "closed"}`}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={refresh}
        mode="edit"
        treatment={treatment}
      />

      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Detalle</h2>

          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Pill className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {medicationLabel}
                </h2>
                <p className="text-sm text-slate-500">
                  Asociado a {treatment.conditionName || "condicion no disponible"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition shadow-sm"
              >
                Editar
              </button>

              <button
                onClick={() => {
                  const ok = confirm("Eliminar este tratamiento?")
                  if (!ok) return
                  onDelete?.(treatment.id)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-100 transition shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl text-center">
            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Condicion
              </p>
              <p className="text-sm font-bold mt-1">
                {treatment.conditionName || "--"}
              </p>
            </div>

            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Medicamento
              </p>
              <p className="text-sm font-bold mt-1">
                {medicationLabel}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Estado condicion
              </p>
              <p className="text-sm font-bold mt-1 text-emerald-600">
                {statusLabel[conditionStatus] || conditionStatus || "--"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl text-center">
            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Dosis
              </p>
              <p className="text-sm font-bold mt-1">
                {treatment.dosage || "--"}
              </p>
            </div>

            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Fecha inicio
              </p>
              <p className="text-sm font-bold mt-1">
                {treatment.start_date || "--"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Fecha fin
              </p>
              <p className="text-sm font-bold mt-1 text-slate-400">
                {treatment.end_date || "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Notas</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700 italic">
              {treatment.notes || "Sin notas"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
