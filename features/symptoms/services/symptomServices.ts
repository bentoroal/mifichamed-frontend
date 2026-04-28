import { apiFetch } from "@/lib/api"

// -----------------------------
// TYPES
// -----------------------------

type CreateUserSymptomPayload = {
  symptom_id: number
  start_date: string
  end_date?: string | null
  notes?: string
}

type DailyPayload = {
  date: string
  severity: number
}

// -----------------------------
// USER SYMPTOMS
// -----------------------------

export const getUserSymptoms = () => {
  return apiFetch("/user-symptoms/")
}

export const getUserSymptom = (id: number) => {
  return apiFetch(`/user-symptoms/${id}/`)
}

export const createUserSymptom = (data: CreateUserSymptomPayload) => {
  return apiFetch("/user-symptoms/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateUserSymptom = (
  id: number,
  data: Partial<CreateUserSymptomPayload>
) => {
  return apiFetch(`/user-symptoms/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteUserSymptom = (id: number) => {
  return apiFetch(`/user-symptoms/${id}/`, {
    method: "DELETE",
  })
}

// -----------------------------
// SYMPTOM CATALOG
// -----------------------------

export const searchSymptoms = () => {
  return apiFetch("/symptoms/")
}

export const createCustomSymptom = (name: string) => {
  return apiFetch("/symptoms/", {
    method: "POST",
    body: JSON.stringify({
      name,
      is_custom: true,
    }),
  })
}

// -----------------------------
// DAILY RECORDS 
// -----------------------------

// 🔹 obtener registro de un día específico
export const getDaily = (symptomId: number, date: string) => {
  return apiFetch(
    `/user-symptoms/${symptomId}/daily/by-date?date=${date}`
  )
}

// 🔹 UPSERT (crear o actualizar automáticamente)
export const upsertDaily = async (
  symptomId: number,
  date: string,
  severity: number
) => {
  return apiFetch(`/user-symptoms/${symptomId}/daily`, {
    method: "POST",
    body: JSON.stringify({
      date,
      severity,
    }),
  })
}

// -----------------------------
// DAILY RECORDS (EXTRA / FUTURO)
// -----------------------------

// 🔹 obtener todos los registros (para gráficos o heatmap)
export const getDailyRecords = (symptomId: number) => {
  return apiFetch(`/user-symptoms/${symptomId}/daily`)
}

// 🔹 crear manual 
export const createDailyRecord = (
  symptomId: number,
  data: DailyPayload
) => {
  return apiFetch(`/user-symptoms/${symptomId}/daily`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// 🔹 actualizar manual
export const updateDailyRecord = (
  symptomId: number,
  dailyId: number,
  data: Partial<DailyPayload>
) => {
  return apiFetch(`/user-symptoms/${symptomId}/daily/${dailyId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

// 🔹 eliminar registro
export const deleteDailyRecord = (
  symptomId: number,
  dailyId: number
) => {
  return apiFetch(`/user-symptoms/${symptomId}/daily/${dailyId}`, {
    method: "DELETE",
  })
}

// -----------------------------
// UTILITIES
// -----------------------------

// 🔹 helper para formatear fecha (clave para evitar bugs)
export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0]
}
