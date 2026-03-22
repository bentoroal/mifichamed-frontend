"use client"

import { useState } from "react"
import { saveToken } from "@/lib/auth"
import { apiFetch } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function LoginForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter() // ✅ SIEMPRE arriba

  async function handleSubmit(e: any) {
    e.preventDefault()

    const form = new URLSearchParams()
    form.append("username", email)
    form.append("password", password)

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      saveToken(data.access_token)
      router.push("/dashboard")    

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button className="w-full bg-teal-600 text-white py-4 rounded-lg font-bold">
        Iniciar sesión
      </button>

    </form>
  )
}