"use client"

import { useState } from "react"
import { Pencil, ShieldAlert, Trash2 } from "lucide-react"

import AllergyModal from "./AllergyModal"
import { AllergyItem } from "../types"

type AllergyDetailProps = {
  allergy: AllergyItem | null
  refresh: () => Promise<void>
  onDelete?: (id: number) => void
}

export default function AllergyDetail({
  allergy,
  refresh,
  onDelete,
}: AllergyDetailProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const statusLabel = allergy?.status === "remission" ? "En remision" : "Activa"

  if (!allergy) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-slate-400">
        Selecciona una alergia para ver el detalle
      </div>
    )
  }

  return (
    <>
      <AllergyModal
        key={`${allergy.id}-${isEditOpen ? "open" : "closed"}`}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={refresh}
        mode="edit"
        allergy={allergy}
      />

      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Detalle</h2>

          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {allergy.allergy?.name}
                </h2>
                <p className="text-sm text-slate-500">
                  Alergia independiente
                </p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition shadow-sm"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </button>

              <button
                onClick={() => {
                  const ok = confirm("Eliminar esta alergia?")
                  if (!ok) return
                  onDelete?.(allergy.id)
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
                Estado
              </p>
              <p className="text-sm font-bold mt-1 text-amber-700">
                {statusLabel}
              </p>
            </div>

            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Fecha inicio
              </p>
              <p className="text-sm font-bold mt-1 text-slate-800">
                {allergy.start_date || "--"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Fecha fin
              </p>
              <p className="text-sm font-bold mt-1 text-slate-400">
                {allergy.end_date || "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Notas</h3>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700 italic">
              {allergy.notes || "Sin notas"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
