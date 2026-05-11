const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {

  const token = localStorage.getItem("token")
  const method = options.method || 'GET'


  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    })


    if (res.status === 401) {
      console.error('❌ 401 Unauthorized - Token inválido')
      localStorage.removeItem("token")
      window.location.href = "/"
      throw new Error("Unauthorized")
    }

    let data = null
    try {
      const text = await res.text()
      if (text) data = JSON.parse(text)
    } catch {}

    if (!res.ok) {
      console.error(`❌ Error:`, { status: res.status, data })
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }
    return data
  } catch (error) {
    console.error(`💥 Network Error:`, error)
    throw error
  }
}