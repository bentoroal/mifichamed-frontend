import { apiFetch } from "@/lib/api"
import { AllergyCatalogItem, AllergyItem } from "../types"

type AllergyPayload = {
  allergy_id?: number
  name?: string
  status?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string
}

export const getAllergiesCatalog = () => {
  return apiFetch("/allergies/") as Promise<AllergyCatalogItem[]>
}

export const getUserAllergies = () => {
  return apiFetch("/user-allergies/") as Promise<AllergyItem[]>
}

export const createUserAllergy = (data: AllergyPayload) => {
  return apiFetch("/user-allergies/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateUserAllergy = (
  id: number,
  data: AllergyPayload
) => {
  return apiFetch(`/user-allergies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteUserAllergy = (id: number) => {
  return apiFetch(`/user-allergies/${id}`, {
    method: "DELETE",
  })
}
