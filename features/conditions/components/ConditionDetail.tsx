"use client"

import { useState } from "react"
import ConditionModal from "@/features/conditions/components/ConditionModal"
import { getCategoryIcon } from "@/lib/categoryIcons"
import { Pencil, Trash2 } from "lucide-react"

export default function ConditionDetail({ condition, refresh, onDelete }: any) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  if (!condition) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-slate-400">
        Selecciona una condición para ver el detalle
      </div>
    )
  }

  const statusLabel: any = {
    active: "Activa",
    chronic: "Crónica",
    resolved: "Resuelta",
    remission: "En Remisión",
  }

  const Icon = getCategoryIcon(condition.condition?.category)

  return (
    <>
      <ConditionModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={refresh}
        mode="edit"
        condition={condition}
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
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {condition.condition?.name}
                </h2>
                <p className="text-sm text-slate-500">
                  {condition.condition?.category}
                </p>
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
                  const ok = confirm("¿Eliminar esta enfermedad?");
                  if (!ok) return;
                  onDelete?.(condition.id);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-100 transition shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl text-center">
            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">Fecha inicio</p>
              <p className="text-sm font-bold mt-1">{condition.start_date || "--"}</p>
            </div>
            <div className="border-r border-slate-200 last:border-0">
              <p className="text-[10px] uppercase font-bold text-slate-400">Fecha fin</p>
              <p className="text-sm font-bold mt-1 text-slate-400">{condition.end_date || "--"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Estado</p>
              <p className="text-sm font-bold mt-1 text-emerald-600">
                {statusLabel[condition.status]}
              </p>
            </div>
          </div>
        </div>

        {/* NOTAS: Segundo hijo, aquí sí aplica el gap de space-y-4 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Notas</h3>
          <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700 italic">
              {condition.notes || "Sin notas"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}