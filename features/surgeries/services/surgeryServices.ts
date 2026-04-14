import { apiFetch } from "@/lib/api"

// =====================
// TYPES
// =====================

type CreateUserSurgeryPayload = {
  surgery_id?: number | null
  name?: string | null
  user_condition_id?: number | null
  surgery_date?: string | null
  notes?: string
}

// =====================
// USER SURGERIES
// =====================

export const getUserSurgeries = () => {
  return apiFetch("/user-surgeries/")
}

export const getUserSurgery = (id: number) => {
  return apiFetch(`/user-surgeries/${id}/`)
}

export const createUserSurgery = (data: CreateUserSurgeryPayload) => {
  return apiFetch("/user-surgeries/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateUserSurgery = (
  id: number,
  data: Partial<CreateUserSurgeryPayload>
) => {
  return apiFetch(`/user-surgeries/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteUserSurgery = (id: number) => {
  return apiFetch(`/user-surgeries/${id}/`, {
    method: "DELETE",
  })
}

// =====================
// SURGERY CATALOG
// =====================

export const searchSurgeries = () => {
  return apiFetch("/surgeries/")
}

