import { apiFetch } from "@/lib/api"
import { MedicationCatalogItem, TreatmentItem } from "../types"

export type CreateTreatmentFormData = {
  user_condition_id: number
  medication_id?: number | null
  dosage?: string
  frequency?: string
  startDate?: string
  endDate?: string
  notes?: string
}

export type UpdateTreatmentFormData = {
  medication_id?: number | null
  dosage?: string
  frequency?: string
  startDate?: string
  endDate?: string
  notes?: string
}

type UpdateTreatmentPayload = {
  medication_id?: number | null
  dosage?: string | null
  frequency?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string | null
}

function cleanPayload<T extends Record<string, unknown>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  ) as T
}

function toCreateApiPayload(data: CreateTreatmentFormData) {
  return cleanPayload({
    user_condition_id: data.user_condition_id,
    medication_id: data.medication_id ?? null,
    dosage: data.dosage || null,
    frequency: data.frequency || null,
    start_date: data.startDate || null,
    end_date: data.endDate || null,
    notes: data.notes || null,
  })
}

function toUpdateApiPayload(data: UpdateTreatmentFormData) {
  return cleanPayload({
    medication_id: data.medication_id ?? null,
    dosage: data.dosage || null,
    frequency: data.frequency || null,
    start_date: data.startDate || null,
    end_date: data.endDate || null,
    notes: data.notes || null,
  } as UpdateTreatmentPayload)
}

export const getUserTreatments = () => {
  return apiFetch("/condition-treatments/") as Promise<TreatmentItem[]>
}

export const getMedications = () => {
  return apiFetch("/medications/") as Promise<MedicationCatalogItem[]>
}

export const createMedication = (name: string) => {
  return apiFetch("/medications/", {
    method: "POST",
    body: JSON.stringify({
      name,
      is_custom: true,
    }),
  }) as Promise<MedicationCatalogItem>
}

export const createUserTreatment = (data: CreateTreatmentFormData) => {
  return apiFetch("/condition-treatments/", {
    method: "POST",
    body: JSON.stringify(toCreateApiPayload(data)),
  })
}

export const updateUserTreatment = (
  id: number,
  data: UpdateTreatmentFormData
) => {
  return apiFetch(`/condition-treatments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(toUpdateApiPayload(data)),
  })
}

export const deleteUserTreatment = (id: number) => {
  return apiFetch(`/condition-treatments/${id}`, {
    method: "DELETE",
  })
}
