"use client"

import { useEffect, useState } from "react"
import BaseModal from "@/components/ui/BaseModal"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/TextArea"
import Select from "@/components/ui/Select"
import FormField from "@/components/ui/FormField"

import {
  createUserSurgery,
  updateUserSurgery,
  searchSurgeries,
} from "../services/surgeryServices"

export default function SurgeryModal({
  isOpen,
  onClose,
  onSuccess,
  mode = "create",
  surgery = null,
}: any) {
  const isEdit = mode === "edit"

  // =====================
  // STATE
  // =====================
  const [form, setForm] = useState({
    surgery_id: undefined as number | undefined,
    surgery_name: "",
    surgery_date: "",
    notes: "",
  })

  const [catalog, setCatalog] = useState<any[]>([])
  const [isCustom, setIsCustom] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)

  // =====================
  // LOAD SURGERIES
  // =====================
  useEffect(() => {
    if (!isOpen) return

    const load = async () => {
      try {
        setLoading(true)
        const surgeryData = await searchSurgeries()
        const sorted = surgeryData.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        )
        setCatalog(sorted)
      } catch (err) {
        console.error("Error cargando cirugías", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [isOpen])

  // =====================
  // SYNC EDIT MODE
  // =====================
  useEffect(() => {
    if (isEdit && surgery) {
      setForm({
        surgery_id: surgery.surgery?.id,
        surgery_name: surgery.surgery?.name || "",
        surgery_date: surgery.surgery_date || "",
        notes: surgery.notes || "",
      })
    }
  }, [surgery, isEdit])

  // =====================
  // RESET CREATE MODE
  // =====================
  useEffect(() => {
    if (isOpen && !isEdit) {
      setForm({
        surgery_id: undefined,
        surgery_name: "",
        surgery_date: "",
        notes: "",
      })

      setIsCustom(false)
      setErrors({})
    }
  }, [isOpen, isEdit])

  // =====================
  // HELPERS
  // =====================
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev: any) => ({
      ...prev,
      [field]: null,
    }))
  }

  // =====================
  // VALIDATION
  // =====================
  const validate = () => {
    const newErrors: any = {}

    if (!isEdit) {
      if (isCustom) {
        if (!form.surgery_name?.trim()) {
          newErrors.surgery_name = "Requerido"
        }
      } else {
        if (!form.surgery_id) {
          newErrors.surgery_id = "Requerido"
        }
      }
    }

    if (!form.surgery_date) {
      newErrors.surgery_date = "Requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async () => {
    if (!validate()) return

    try {
      const payload: any = {
        surgery_date: form.surgery_date,
        notes: form.notes,
      }

      if (isCustom) {
        payload.name = form.surgery_name.trim()
      } else {
        payload.surgery_id = form.surgery_id
      }

      if (isEdit) {
        await updateUserSurgery(surgery.id, payload)
      } else {
        await createUserSurgery(payload)
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      console.error("Error guardando cirugía", err)
    }
  }

  // =====================
  // RENDER
  // =====================
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar Cirugía" : "Añadir Cirugía"}
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
      {/* SURGERY SELECT / CUSTOM */}
      <FormField
        label="Cirugía"
        error={isCustom ? errors.surgery_name : errors.surgery_id}
      >
        <div className="flex gap-2">
          {!isCustom ? (
            <Select
              value={form.surgery_id ?? ""}
              disabled={isEdit || loading}
              onChange={(e: any) => {
                const selected = catalog.find(
                  (s) => s.id === Number(e.target.value)
                )

                handleChange("surgery_id", selected?.id)
                handleChange("surgery_name", selected?.name)
              }}
              options={catalog.map((s) => ({
                value: s.id,
                label: `${s.name}${s.is_custom ? " (Custom)" : ""}`,
              }))}
              error={errors.surgery_id}
            />
          ) : (
            <Input
              type="text"
              placeholder="Nombre de la cirugía"
              value={form.surgery_name}
              onChange={(e: any) =>
                handleChange("surgery_name", e.target.value)
              }
              error={errors.surgery_name}
            />
          )}

          {!isEdit && (
            <button
              type="button"
              onClick={() => {
                setIsCustom(!isCustom)
                handleChange("surgery_id", undefined)
                handleChange("surgery_name", "")

                setErrors((prev: any) => ({
                  ...prev,
                  surgery_id: null,
                  surgery_name: null,
                }))
              }}
              className="px-3 rounded-lg border text-sm hover:bg-slate-50 whitespace-nowrap"
            >
              {isCustom ? "Usar lista" : "+ Nueva"}
            </button>
          )}
        </div>
      </FormField>

      {/* DATE */}
      <FormField label="Fecha de Cirugía" error={errors.surgery_date}>
        <Input
          type="date"
          value={form.surgery_date}
          onChange={(e: any) =>
            handleChange("surgery_date", e.target.value)
          }
          error={errors.surgery_date}
        />
      </FormField>

      {/* NOTES */}
      <FormField label="Notas">
        <Textarea
          value={form.notes}
          onChange={(e: any) => handleChange("notes", e.target.value)}
          placeholder="Ej: Sin complicaciones, recuperación normal..."
        />
      </FormField>
    </BaseModal>
  )
}
