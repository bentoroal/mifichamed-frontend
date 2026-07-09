"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { apiFetch } from "@/lib/api"

const sexOptions = [
  { label: "Masculino", value: "male" },
  { label: "Femenino", value: "female" },
  { label: "Otro", value: "other" }
] as const

const alcoholOptions = [
  { label: "No consumo", value: "none" },
  { label: "Social", value: "social" },
  { label: "Regular", value: "regular" },
  { label: "Alto", value: "heavy" }
] as const

const smokingOptions = [
  { label: "No fumo", value: "none" },
  { label: "Social", value: "social" },
  { label: "Regular", value: "regular" },
  { label: "Alto", value: "heavy" }
] as const

const physicalActivityOptions = [
  { label: "Sin actividad", value: "none" },
  { label: "Ligera", value: "light" },
  { label: "Moderada", value: "moderate" },
  { label: "Intensa", value: "intense" }
] as const

type Sex = (typeof sexOptions)[number]["value"] | ""
type AlcoholConsumption = (typeof alcoholOptions)[number]["value"] | ""
type SmokingHabits = (typeof smokingOptions)[number]["value"] | ""
type PhysicalActivity = (typeof physicalActivityOptions)[number]["value"] | ""

type ProfileFormState = {
  full_name: string
  sex: Sex
  birth_date: string
  weight: string
  height: string
  alcohol_consumption: AlcoholConsumption
  smoking_habits: SmokingHabits
  physical_activity: PhysicalActivity
}

type ProfileInitialData = Partial<{
  [Key in keyof ProfileFormState]: string | number | null
}>

type ProfilePayload = {
  full_name: string
  sex: Sex | null
  birth_date: string | null
  weight: number | null
  height: number | null
  alcohol_consumption: AlcoholConsumption | null
  smoking_habits: SmokingHabits | null
  physical_activity: PhysicalActivity | null
}

type ProfileFormProps = {
  mode: "onboarding" | "edit"
  initialData?: ProfileInitialData
}

const emptyForm: ProfileFormState = {
  full_name: "",
  sex: "",
  birth_date: "",
  weight: "",
  height: "",
  alcohol_consumption: "",
  smoking_habits: "",
  physical_activity: ""
}

function normalizeEnumValue(value: string | number | null | undefined) {
  return value ? String(value).toLowerCase() : ""
}

export default function ProfileForm({ mode, initialData }: ProfileFormProps) {
  const router = useRouter()
  const isOnboarding = mode === "onboarding"

  const [form, setForm] = useState<ProfileFormState>(emptyForm)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!initialData) return

    setForm({
      full_name: initialData.full_name ? String(initialData.full_name) : "",
      sex: (initialData.sex || "") as Sex,
      birth_date: initialData.birth_date ? String(initialData.birth_date) : "",
      weight: initialData.weight ? String(initialData.weight) : "",
      height: initialData.height ? String(initialData.height) : "",
      alcohol_consumption: normalizeEnumValue(initialData.alcohol_consumption) as AlcoholConsumption,
      smoking_habits: normalizeEnumValue(initialData.smoking_habits) as SmokingHabits,
      physical_activity: normalizeEnumValue(initialData.physical_activity) as PhysicalActivity
    })
  }, [initialData])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function buildPayload(): ProfilePayload {
    return {
      full_name: form.full_name,
      sex: form.sex || null,
      birth_date: form.birth_date || null,
      weight: form.weight ? Number(form.weight) : null,
      height: form.height ? Number(form.height) : null,
      alcohol_consumption: form.alcohol_consumption || null,
      smoking_habits: form.smoking_habits || null,
      physical_activity: form.physical_activity || null
    }
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

      await apiFetch("/user-profile/", {
        method: isOnboarding ? "POST" : "PATCH",
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
          onChange={handleChange}
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
        <label className="block text-sm font-medium">Altura (cm)</label>
        <input
          type="number"
          step="0.01"
          name="height"
          value={form.height}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Consumo de alcohol</label>
        <select
          name="alcohol_consumption"
          value={form.alcohol_consumption}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Selecciona una opción</option>
          {alcoholOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Hábitos de tabaquismo</label>
        <select
          name="smoking_habits"
          value={form.smoking_habits}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Selecciona una opción</option>
          {smokingOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Actividad física</label>
        <select
          name="physical_activity"
          value={form.physical_activity}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Selecciona una opción</option>
          {physicalActivityOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
