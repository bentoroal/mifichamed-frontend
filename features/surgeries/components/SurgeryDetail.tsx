"use client"

import { useState } from "react"
import SurgeryModal from "@/features/surgeries/components/SurgeryModal"
import { Pencil, Trash2, Bandage } from "lucide-react"

export default function SurgeryDetail({ surgery, refresh, onDelete }: any) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  if (!surgery) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-slate-400">
        Selecciona una cirugía para ver el detalle
      </div>
    )
  }

  return (
    <>
      <SurgeryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={refresh}
        mode="edit"
        surgery={surgery}
      />

      <div className="space-y-4">

        {/* HEADER CARD */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Detalle</h2>

          {/* TOP */}
          <div className="flex justify-between items-start">
            {/* IZQUIERDA */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Bandage className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {surgery.surgery?.name}
                </h2>
              </div>
            </div>

            {/* DERECHA (BOTONES) */}
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
                  const ok = confirm("¿Eliminar esta cirugía?");
                  if (!ok) return;
                  onDelete?.(surgery.id);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-100 transition shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-center">
            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">Fecha de cirugía</p>
              <p className="text-sm font-bold mt-1">{surgery.surgery_date || "--"}</p>
            </div>
          </div>
        </div>

        {/* NOTAS */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Notas</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700 italic">
              {surgery.notes || "Sin notas"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}