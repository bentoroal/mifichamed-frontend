"use client"

import { useEffect, useState } from "react"
import BaseModal from "@/components/ui/BaseModal"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/TextArea"
import Select from "@/components/ui/Select"
import FormField from "@/components/ui/FormField"

import {
  createUserSymptom,
  updateUserSymptom,
  searchSymptoms,
  createCustomSymptom,
} from "../services/symptomServices"

export default function SymptomModal({
  isOpen,
  onClose,
  onSuccess,
  mode = "create",
  symptom = null,
}: any) {
  const isEdit = mode === "edit"
  const today = new Date().toISOString().split("T")[0]

  // -----------------------------
  // STATE
  // -----------------------------
  const [form, setForm] = useState({
    // 🔥 usamos undefined en vez de null
    symptom_id: undefined as number | undefined,
    symptom_name: "",
    start_date: "",
    end_date: "",
    notes: "",
  })

  const [catalog, setCatalog] = useState<any[]>([])
  const [isCustom, setIsCustom] = useState(false)
  const [isOngoing, setIsOngoing] = useState(true)
  const [errors, setErrors] = useState<any>({})

  // -----------------------------
  // HELPERS
  // -----------------------------
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev: any) => ({
      ...prev,
      [field]: null,
    }))
  }

  // -----------------------------
  // LOAD CATALOG
  // -----------------------------
  useEffect(() => {
    if (!isOpen) return

    const load = async () => {
      try {
        const data = await searchSymptoms()

        const sorted = data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        )

        setCatalog(sorted)
      } catch (err) {
        console.error("Error cargando catálogo", err)
      }
    }

    load()
  }, [isOpen])

  // -----------------------------
  // SYNC EDIT MODE
  // -----------------------------
  useEffect(() => {
    if (isEdit && symptom) {
      setForm({
        symptom_id: symptom.symptom?.id,
        symptom_name: symptom.symptom?.name,
        start_date: symptom.start_date || "",
        end_date: symptom.end_date || "",
        notes: symptom.notes || "",
      })

      setIsOngoing(!symptom.end_date)
    }
  }, [symptom, isEdit])

  // -----------------------------
  // RESET CREATE MODE
  // -----------------------------
  useEffect(() => {
    if (isOpen && !isEdit) {
      setForm({
        symptom_id: undefined,
        symptom_name: "",
        start_date: "",
        end_date: "",
        notes: "",
      })

      setIsCustom(false)
      setIsOngoing(true)
      setErrors({})
    }
  }, [isOpen, isEdit])

  // -----------------------------
  // VALIDATION
  // -----------------------------
  const validate = () => {
    const newErrors: any = {}

    if (!isEdit) {
      if (isCustom) {
        if (!form.symptom_name?.trim()) {
          newErrors.symptom_name = "Requerido"
        }
      } else {
        if (!form.symptom_id) {
          newErrors.symptom_id = "Requerido"
        }
      }
    }

    if (!form.start_date) {
      newErrors.start_date = "Requerido"
    }

    if (
      !isOngoing &&
      form.end_date &&
      form.start_date &&
      form.end_date < form.start_date
    ) {
      newErrors.end_date = "Fecha inválida"
    }
    if (!isOngoing && form.end_date && form.end_date > today) {
      newErrors.end_date = "No puede ser futura"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async () => {
    if (!validate()) return

    try {
      let symptomId = form.symptom_id

      // 🔥 crear en catálogo si es custom
      if (!isEdit && isCustom) {
        const newSymptom = await createCustomSymptom(
          form.symptom_name.trim()
        )
        symptomId = newSymptom.id

        // opcional: actualizar catálogo en caliente
        setCatalog((prev) => [...prev, newSymptom])
      }

      // 🔥 guard clause segura
      if (!symptomId) return

      const payload = {
        symptom_id: symptomId, // ✅ ahora siempre number
        start_date: form.start_date,
        end_date: isOngoing ? null : (form.end_date || today),
        notes: form.notes,
      }

      if (isEdit) {
        await updateUserSymptom(symptom.id, payload)
      } else {
        await createUserSymptom(payload)
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      console.error("Error guardando síntoma", err)
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar síntoma" : "Añadir síntoma"}
      footer={
        <>
          <button onClick={onClose}>Cancelar</button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-primary text-white"
          >
            Guardar
          </button>
        </>
      }
    >
      {/* SYMPTOM SELECT / CUSTOM */}
      <FormField
        label="Síntoma"
        error={isCustom ? errors.symptom_name : errors.symptom_id}
      >
        <div className="flex gap-2">
          {!isCustom ? (
            <Select
              value={form.symptom_id ?? ""}
              disabled={isEdit}
              onChange={(e: any) => {
                const selected = catalog.find(
                  (s) => s.id === Number(e.target.value)
                )

                handleChange("symptom_id", selected?.id)
                handleChange("symptom_name", selected?.name)
              }}
              options={catalog.map((s) => ({
                value: s.id,
                label: s.name,
              }))}
              error={errors.symptom_id}
            />
          ) : (
            <Input
              type="text"
              placeholder="Nombre del síntoma"
              value={form.symptom_name}
              onChange={(e: any) =>
                handleChange("symptom_name", e.target.value)
              }
              error={errors.symptom_name}
            />
          )}

          {!isEdit && (
            <button
              type="button"
              onClick={() => {
                setIsCustom(!isCustom)

                // 🔥 usar undefined en vez de null
                handleChange("symptom_id", undefined)
                handleChange("symptom_name", "")

                setErrors((prev: any) => ({
                  ...prev,
                  symptom_id: null,
                  symptom_name: null,
                }))
              }}
              className="px-3 rounded-lg border text-sm hover:bg-slate-50"
            >
              {isCustom ? "Usar lista" : "+ Nuevo"}
            </button>
          )}
        </div>
      </FormField>

      {/* DATES */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha inicio" error={errors.start_date}>
          <Input
            type="date"
            value={form.start_date}
            onChange={(e: any) =>
              handleChange("start_date", e.target.value)
            }
          />
        </FormField>

        <FormField label="Fecha fin" error={errors.end_date}>
          <Input
            type="date"
            value={form.end_date}
            max={today}
            disabled={isOngoing}
            onChange={(e: any) =>
              handleChange("end_date", e.target.value)
            }
          />
        </FormField>
      </div>

      {/* CHECK vigente */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isOngoing}
          onChange={(e) => {
            const checked = e.target.checked
            setIsOngoing(checked)

            if (checked) {
              handleChange("end_date", "")
            }
          }}
        />
        <span className="text-sm text-slate-700">
          Sigue presente
        </span>
      </div>

      {!isOngoing && (
        <p className="text-xs text-slate-500 -mt-1">
          Si no recuerdas la fecha exacta, deja el campo vacío y usaremos hoy.
        </p>
      )}

      {/* NOTES */}
      <FormField label="Notas">
        <Textarea
          value={form.notes}
          onChange={(e: any) =>
            handleChange("notes", e.target.value)
          }
          placeholder="Ej: empeora en la noche..."
        />
      </FormField>
    </BaseModal>
  )
}
