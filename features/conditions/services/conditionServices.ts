import { apiFetch } from "@/lib/api"

// 📌 Catálogo
export const getConditionCategories = () => {
  return apiFetch("/conditions/categories")
}

export const getConditionsByCategory = (category: string) => {
  return apiFetch(`/conditions?category=${category}`)
}

// 📌 Condición custom
export const createCondition = async (data: any) => {
  return apiFetch("/conditions/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// 📌 Usuario
export const getUserConditions = () => {
  return apiFetch("/user-conditions/")
}

export const createUserCondition = (data: any) => {
  return apiFetch("/user-conditions/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateUserCondition = (id: number, data: any) => {
  return apiFetch(`/user-conditions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteUserCondition = (id: number) => {
  return apiFetch(`/user-conditions/${id}`, {
    method: "DELETE",
  })
}