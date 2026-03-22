"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

type ProfileFormProps = {
  mode: "onboarding" | "edit"
  initialData?: any
}

export default function ProfileForm({ mode, initialData }: ProfileFormProps) {

  const router = useRouter()
  const isOnboarding = mode === "onboarding"

  const sexOptions = [
    { label: "Masculino", value: "male" },
    { label: "Femenino", value: "female" },
    { label: "Otro", value: "other" }
  ]

  type Sex = "male" | "female" | "other" | ""

  const [form, setForm] = useState({
    full_name: "",
    sex: "" as Sex,
    birth_date: "",
    weight: "",
    height: ""
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setForm({
        full_name: initialData.full_name || "",
        sex: initialData.sex || "",
        birth_date: initialData.birth_date || "",
        weight: initialData.weight || "",
        height: initialData.height || ""
      })
    }
  }, [initialData])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function buildPayload() {
  const payload: any = {
    full_name: form.full_name,
    sex: form.sex || null,
    birth_date: form.birth_date || null,
  }

  if (form.weight) payload.weight = Number(form.weight)
  if (form.height) payload.height = Number(form.height)

  return payload
}
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        alert("No estás autenticado")
        return
      }

      const method = mode === "onboarding" ? "POST" : "PATCH"

      const res = await apiFetch("/user-profile/", {
        method,
        body: JSON.stringify(buildPayload())
      })

      if (isOnboarding) {
        router.push("/dashboard")
      } else {
        alert("Perfil actualizado correctamente")
      }

    } catch (error) {
      console.error(error)
      alert("Hubo un error")
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- FORM CONTENT ---------------- */

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">

      <div>
        <label className="block text-sm font-medium">Nombre completo</label>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Sexo</label>
        <select
          name="sex"
          value={form.sex}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              sex: e.target.value as Sex
            }))
          }
          required
          className="w-full border rounded-lg p-2"
        >
          <option value="">Selecciona una opción</option>
          {sexOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          name="birth_date"
          value={form.birth_date}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Peso (kg)</label>
        <input
          type="number"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Altura (m)</label>
        <input
          type="number"
          step="0.01"
          name="height"
          value={form.height}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg w-full"
      >
        {loading
          ? "Guardando..."
          : isOnboarding
            ? "Continuar"
            : "Guardar cambios"}
      </button>

    </form>
  )

  /* ---------------- LAYOUT ---------------- */

  if (isOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
          {formContent}
        </div>
      </div>
    )
  }

  return formContent
}