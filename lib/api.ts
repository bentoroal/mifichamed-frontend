const API_URL = "http://127.0.0.1:8000"

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.detail || "API error")
  }

  return data
}