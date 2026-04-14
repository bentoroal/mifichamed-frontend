"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash2 } from "lucide-react"
import SymptomModal from "@/features/symptoms/components/SymptomModal"
import { useSymptomDetail } from "@/features/symptoms/hooks/useSymptomDetail"
import SymptomDaySelector from "./SymptomDaySelector"
import { useSymptomDaily } from "../hooks/useSymptomDaily"
import {getSymptomIcon} from "@/lib/symptomIcons";

export default function SymptomDetail({ symptom, refresh, onDelete }: any) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { notes, setNotes } = useSymptomDetail(symptom)

  const { severity, setSeverity, status } = useSymptomDaily(
    symptom?.id,
    selectedDate
  )
  const Icon = getSymptomIcon(symptom?.symptom?.name)

  function getSeverityColor(value: number) {
    const ratio = (value - 1) / 9 // 0 a 1

    const r = Math.round(34 + (239 - 34) * ratio)   // verde → rojo
    const g = Math.round(197 - (197 - 68) * ratio)
    const b = Math.round(94 - (94 - 68) * ratio)

    return `rgb(${r}, ${g}, ${b})`
  }

  const color = getSeverityColor(severity)

  // 🔥 reset fecha al cambiar síntoma
  useEffect(() => {
    setSelectedDate(new Date())
  }, [symptom?.id])

  if (!symptom) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-slate-400">
        Selecciona un síntoma para ver el detalle
      </div>
    )
  }

  return (
    <>
      <SymptomModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={refresh}
        mode="edit"
        symptom={symptom}
      />

      <div className="space-y-4">

        {/* HEADER CARD */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Detalle</h2>

          {/* TOP */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {symptom.symptom?.name}
                </h2>
                <p className="text-sm text-slate-500">
                  {symptom.symptom?.category}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition shadow-sm"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </button>

              <button
                onClick={() => {
                  const ok = confirm("¿Eliminar este síntoma?");
                  if (!ok) return;

                  onDelete?.(symptom.id);
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
              <p className="text-[10px] uppercase font-bold text-slate-400">Fecha inicio</p>
              <p className="text-sm font-bold mt-1">{symptom.start_date || "--"}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Estado</p>
              <p className="text-sm font-bold mt-1 text-emerald-600">Activo</p>
            </div>
          </div>
        </div>

        {/* TRACKING DIARIO */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
          <h3 className="font-semibold text-slate-700">
            Registro diario
          </h3>

          {/* 📅 selector */}
          <SymptomDaySelector
            startDate={symptom.start_date}
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />

          {/* 🎚 intensidad */}
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-slate-500">
                Intensidad del día
              </span>
              <span className="font-bold text-primary">
                {severity}/10
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              style={{
                accentColor: color,
              }}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div className="text-xs mt-2 h-4">
            {status === "saving" && (
              <span className="text-slate-400 animate-pulse">Guardando...</span>
            )}
            {status === "saved" && (
              <span className="text-emerald-600">✔ Guardado</span>
            )}
            {status === "error" && (
              <span className="text-red-500">Error al guardar</span>
            )}
          </div>
        </div>

        {/* NOTAS */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
          <h3 className="font-semibold text-slate-700">
            Notas
          </h3>

          <textarea
            className="w-full border border-slate-200 rounded-lg p-3 text-sm min-h-[120px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Añadir notas..."
          />

          <p className="text-xs text-slate-400">
            Guardado automático
          </p>
        </div>

      </div>
    </>
  )
}