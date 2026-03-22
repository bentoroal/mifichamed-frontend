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

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/"
    throw new Error("Unauthorized")
  }

  let data = null

  try {
    data = await res.json()
  } catch {
    // respuesta vacía
  }

  if (!res.ok) {
  
  throw new Error(JSON.stringify(data))
}

  return data
}