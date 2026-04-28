"use client"

import { ChangeEvent, useEffect, useState } from "react"

import BaseModal from "@/components/ui/BaseModal"
import FormField from "@/components/ui/FormField"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import StatusSelector from "@/components/ui/StatusSelector"
import Textarea from "@/components/ui/TextArea"
import {
  createUserAllergy,
  getAllergiesCatalog,
  updateUserAllergy,
} from "../services/allergyServices"
import { AllergyCatalogItem, AllergyItem } from "../types"

type AllergyModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void | Promise<void>
  mode?: "create" | "edit"
  allergy?: AllergyItem | null
}

type AllergyFormState = {
  allergy_id: string
  name: string
  status: string
  start_date: string
  end_date: string
  notes: string
}

function getInitialForm(allergy?: AllergyItem | null): AllergyFormState {
  return {
    allergy_id: allergy?.allergy_id ? String(allergy.allergy_id) : "",
    name: allergy?.allergy?.name || "",
    status: allergy?.status || "active",
    start_date: allergy?.start_date || "",
    end_date: allergy?.end_date || "",
    notes: allergy?.notes || "",
  }
}

export default function AllergyModal({
  isOpen,
  onClose,
  onSuccess,
  mode = "create",
  allergy = null,
}: AllergyModalProps) {
  const isEdit = mode === "edit"

  const [form, setForm] = useState<AllergyFormState>(() => getInitialForm(allergy))
  const [catalog, setCatalog] = useState<AllergyCatalogItem[]>([])
  const [loadingCatalog, setLoadingCatalog] = useState(false)
  const [isCustom, setIsCustom] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | null>>({})

  useEffect(() => {
    if (!isOpen) return

    const loadCatalog = async () => {
      try {
        setLoadingCatalog(true)
        const data = await getAllergiesCatalog()
        setCatalog((data || []).sort((a, b) => a.name.localeCompare(b.name)))
      } catch (err) {
        console.error("Error cargando alergias", err)
      } finally {
        setLoadingCatalog(false)
      }
    }

    loadCatalog()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    setForm(getInitialForm(allergy))
    setErrors({})
    setIsCustom(false)
  }, [allergy, isOpen])

  const handleChange = (field: keyof AllergyFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (isCustom && !isEdit) {
      if (!form.name.trim()) {
        newErrors.name = "Requerido"
      }
    } else if (!form.allergy_id) {
      newErrors.allergy_id = "Requerido"
    }

    if (
      form.start_date &&
      form.end_date &&
      form.end_date < form.start_date
    ) {
      newErrors.end_date = "Fecha invalida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      const payload: {
        allergy_id?: number
        name?: string
        status: string
        start_date?: string | null
        end_date?: string | null
        notes?: string
      } = {
        notes: form.notes.trim(),
        status: form.status,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      }

      if (isEdit) {
        if (!allergy) return
        payload.allergy_id = Number(form.allergy_id)
        await updateUserAllergy(allergy.id, payload)
      } else {
        if (isCustom) {
          payload.name = form.name.trim()
        } else {
          payload.allergy_id = Number(form.allergy_id)
        }
        await createUserAllergy(payload)
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      console.error("Error guardando alergia", err)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar Alergia" : "Anadir Alergia"}
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
      <FormField
        label="Alergia"
        error={(errors.allergy_id || errors.name) ?? undefined}
      >
        <div className="flex gap-2">
          {!isCustom || isEdit ? (
            <Select
              value={form.allergy_id}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChange("allergy_id", e.target.value)
              }
              disabled={loadingCatalog}
              options={catalog.map((item) => ({
                value: item.id,
                label: `${item.name}${item.is_custom ? " (Custom)" : ""}`,
              }))}
              error={errors.allergy_id}
            />
          ) : (
            <Input
              type="text"
              value={form.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("name", e.target.value)
              }
              placeholder="Ej: Penicilina"
              error={errors.name}
            />
          )}

          {!isEdit && (
            <button
              type="button"
              onClick={() => {
                setIsCustom((prev) => !prev)
                handleChange("allergy_id", "")
                handleChange("name", "")
              }}
              className="px-3 rounded-lg border text-sm hover:bg-slate-50 whitespace-nowrap"
            >
              {isCustom ? "Usar lista" : "+ Nueva"}
            </button>
          )}
        </div>
      </FormField>

      <FormField label="Estado">
        <StatusSelector
          value={form.status}
          onChange={(value) => handleChange("status", value)}
          options={[
            { value: "active", label: "Activa" },
            { value: "remission", label: "Remision" },
          ]}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Fecha inicio">
          <Input
            type="date"
            value={form.start_date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("start_date", e.target.value)
            }
          />
        </FormField>

        <FormField label="Fecha fin" error={errors.end_date ?? undefined}>
          <Input
            type="date"
            value={form.end_date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("end_date", e.target.value)
            }
            error={errors.end_date}
          />
        </FormField>
      </div>

      <FormField label="Notas">
        <Textarea
          value={form.notes}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange("notes", e.target.value)
          }
          placeholder="Agrega detalles relevantes (opcional)..."
        />
      </FormField>
    </BaseModal>
  )
}
