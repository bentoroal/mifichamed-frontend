"use client"

import { ChangeEvent, useEffect, useState } from "react"

import BaseModal from "@/components/ui/BaseModal"
import FormField from "@/components/ui/FormField"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/TextArea"
import { getUserConditions } from "@/features/conditions/services/conditionServices"
import {
  createMedication,
  createUserTreatment,
  CreateTreatmentFormData,
  getMedications,
  updateUserTreatment,
  UpdateTreatmentFormData,
} from "../services/treatmentServices"
import {
  MedicationCatalogItem,
  TreatmentItem,
  UserConditionOption,
} from "../types"

type TreatmentModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void | Promise<void>
  mode?: "create" | "edit"
  treatment?: TreatmentItem | null
}

type TreatmentFormState = {
  user_condition_id: string
  medication_id: string
  medication_name: string
  dosage: string
  frequency: string
  start_date: string
  end_date: string
  notes: string
}

function getInitialForm(treatment?: TreatmentItem | null): TreatmentFormState {
  return {
    user_condition_id: treatment?.user_condition_id
      ? String(treatment.user_condition_id)
      : "",
    medication_id: treatment?.medication_id
      ? String(treatment.medication_id)
      : "",
    medication_name: "",
    dosage: treatment?.dosage || "",
    frequency: treatment?.frequency || "",
    start_date: treatment?.start_date || "",
    end_date: treatment?.end_date || "",
    notes: treatment?.notes || "",
  }
}

export default function TreatmentModal({
  isOpen,
  onClose,
  onSuccess,
  mode = "create",
  treatment = null,
}: TreatmentModalProps) {
  const isEdit = mode === "edit"

  const [form, setForm] = useState<TreatmentFormState>(() => getInitialForm(treatment))
  const [conditions, setConditions] = useState<UserConditionOption[]>([])
  const [medications, setMedications] = useState<MedicationCatalogItem[]>([])
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [loadingConditions, setLoadingConditions] = useState(false)
  const [loadingMedications, setLoadingMedications] = useState(false)
  const [isCustomMedication, setIsCustomMedication] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const loadConditions = async () => {
      try {
        setLoadingConditions(true)
        const data = await getUserConditions() as UserConditionOption[]
        setConditions(data || [])
      } catch (err) {
        console.error("Error cargando condiciones", err)
      } finally {
        setLoadingConditions(false)
      }
    }

    loadConditions()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const loadMedications = async () => {
      try {
        setLoadingMedications(true)
        const data = await getMedications()
        setMedications((data || []).sort((a, b) => a.name.localeCompare(b.name)))
      } catch (err) {
        console.error("Error cargando medicamentos", err)
      } finally {
        setLoadingMedications(false)
      }
    }

    loadMedications()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    setForm(getInitialForm(treatment))
    setErrors({})
    setIsCustomMedication(false)
  }, [isOpen, treatment])

  const handleChange = (field: keyof TreatmentFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.user_condition_id) {
      newErrors.user_condition_id = "Selecciona una condicion"
    }

    if (isCustomMedication) {
      if (!form.medication_name.trim()) {
        newErrors.medication_name = "Requerido"
      }
    } else if (!form.medication_id) {
      newErrors.medication_id = "Selecciona un medicamento"
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
      let medicationId = form.medication_id ? Number(form.medication_id) : null

      if (isCustomMedication) {
        const medication = await createMedication(form.medication_name.trim())
        medicationId = medication.id
      }

      const createPayload: CreateTreatmentFormData = {
        user_condition_id: Number(form.user_condition_id),
        medication_id: medicationId,
        dosage: form.dosage.trim(),
        frequency: form.frequency.trim(),
        startDate: form.start_date,
        endDate: form.end_date,
        notes: form.notes.trim(),
      }

      const updatePayload: UpdateTreatmentFormData = {
        medication_id: medicationId,
        dosage: form.dosage.trim(),
        frequency: form.frequency.trim(),
        startDate: form.start_date,
        endDate: form.end_date,
        notes: form.notes.trim(),
      }

      if (isEdit) {
        if (!treatment) return
        await updateUserTreatment(treatment.id, updatePayload)
      } else {
        await createUserTreatment(createPayload)
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      console.error("Error guardando tratamiento", err)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar Tratamiento" : "Anadir Tratamiento"}
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
      <FormField label="Condicion asociada" error={errors.user_condition_id ?? undefined}>
        <Select
          value={form.user_condition_id}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChange("user_condition_id", e.target.value)
          }
          disabled={loadingConditions || isEdit}
          options={conditions.map((condition) => ({
            value: condition.id,
            label: condition.condition?.name,
          }))}
          error={errors.user_condition_id}
        />
      </FormField>

      {conditions.length === 0 && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          Primero debes registrar una enfermedad o condicion para poder asociar un tratamiento.
        </p>
      )}

      <FormField
        label="Medicamento"
        error={(errors.medication_id || errors.medication_name) ?? undefined}
      >
        <div className="flex gap-2">
          {!isCustomMedication ? (
            <Select
              value={form.medication_id}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChange("medication_id", e.target.value)
              }
              disabled={loadingMedications}
              options={medications.map((medication) => ({
                value: medication.id,
                label: `${medication.name}${medication.is_custom ? " (Custom)" : ""}`,
              }))}
              error={errors.medication_id}
            />
          ) : (
            <Input
              type="text"
              value={form.medication_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange("medication_name", e.target.value)
              }
              placeholder="Nombre del medicamento"
              error={errors.medication_name}
            />
          )}

          <button
            type="button"
            onClick={() => {
              setIsCustomMedication((prev) => !prev)
              handleChange("medication_id", "")
              handleChange("medication_name", "")
            }}
            className="px-3 rounded-lg border text-sm hover:bg-slate-50 whitespace-nowrap"
          >
            {isCustomMedication ? "Usar lista" : "+ Nuevo"}
          </button>
        </div>
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Dosis">
          <Input
            type="text"
            value={form.dosage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("dosage", e.target.value)
            }
            placeholder="Ej: 500 mg"
          />
        </FormField>

        <FormField label="Frecuencia">
          <Input
            type="text"
            value={form.frequency}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("frequency", e.target.value)
            }
            placeholder="Ej: Cada 12 horas"
          />
        </FormField>
      </div>

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
