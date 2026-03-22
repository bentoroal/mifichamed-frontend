import { apiFetch } from "./api"

export function saveToken(token: string) {
  localStorage.setItem("token", token)
}

export function logout() {
  localStorage.removeItem("token")
  window.location.href = "/"
}

export function getToken() {
  return localStorage.getItem("token")
}

export async function validateToken() {
  const token = getToken()

  if (!token) return false

  try {
    await apiFetch("/auth/me")
    return true
  } catch {
    return false
  }
}