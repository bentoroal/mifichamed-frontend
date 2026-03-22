"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Activity, Stethoscope, Pill, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"

import { getDashboard } from "@/lib/dashboard"
import { DashboardData } from "@/features/dashboard/types"

import MetricCard from "@/components/ui/MetricCard"
import DashboardCard from "@/components/ui/DashboardCard"

export default function DashboardPage() {

  /* ---------------- STATE ---------------- */

  const [data, setData] = useState<DashboardData | null>(null)

  /* ---------------- DATA FETCH ---------------- */

const router = useRouter()

useEffect(() => {
  async function loadDashboard() {
    const dashboard = await getDashboard()

    // 🚨 VALIDACIÓN DE CUENTA SIN DATOS DE SALUD
    if (!dashboard.profile || !dashboard.profile.weight || !dashboard.profile.height) {
      router.push("/onboarding/profile")
      return
    }

    setData(dashboard)
  }

  loadDashboard()
}, [])

  /* ---------------- LOADING ---------------- */

  if (!data) {
    return <p className="p-6">Cargando dashboard...</p>
  }

  /* ---------------- DESTRUCTURING ---------------- */

  const {
    profile,
    active_conditions,
    active_symptoms,
    active_allergies
  } = data

  /* Calculo de BMI y su estado */
  let bmi: number | string = "N/A"
  let bmi_status = "Datos insuficientes"

  if (profile?.weight != null && profile?.height != null) {
    const heightInMeters = profile.height / 100

    bmi = profile.weight / (heightInMeters * heightInMeters)
    bmi = Number(bmi.toFixed(1))

    bmi_status =
      bmi < 18.5 ? "Bajo peso" :
      bmi < 25 ? "Normal" :
      bmi < 30 ? "Sobrepeso" : "Obesidad"
  }

  /* tratamientos vienen dentro de condiciones */
  const treatments = active_conditions.flatMap((c) => c.treatments)

  /* ---------------- UI ---------------- */

  return (
    <div className="container mx-auto max-w-7xl p-6 md:p-10">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="font-bold text-teal-600 mb-1">
          ¡Hola {profile?.full_name}!
        </p>

        <h2 className="text-4xl font-black text-teal-950">
          Resumen de Salud
        </h2>
      </motion.div>


      {/* METRICS */}

      <section className="mb-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          <MetricCard label="Peso" value={profile?.weight ?? "N/A"} unit="kg" />
          <MetricCard label="Altura" value={profile?.height ?? "N/A"} unit="cms." />
          <MetricCard label="IMC" value={bmi} status={bmi_status} />

        </div>
      </section>


      {/* DASHBOARD CARDS */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* CONDITIONS */}

        <DashboardCard
          title="Enfermedades"
          icon={Activity}
          iconColor="text-red-400"
        >

          {active_conditions.length === 0 ? (

            <p className="text-gray-500">
              No hay condiciones activas
            </p>

          ) : (

            <ul className="space-y-2">

              {active_conditions.map((c) => (

                <li key={c.id} className="text-sm">
                  {c.condition.name}
                </li>

              ))}

            </ul>

          )}

        </DashboardCard>


        {/* SYMPTOMS */}

        <DashboardCard
          title="Síntomas"
          icon={Stethoscope}
          iconColor="text-blue-400"
        >

          {active_symptoms.length === 0 ? (

            <p className="text-gray-500">
              No hay síntomas activos
            </p>

          ) : (

            <ul className="space-y-2">

              {active_symptoms.map((s) => (

                <li key={s.id}>
                  {s.symptom.name}
                </li>

              ))}

            </ul>

          )}

        </DashboardCard>


        {/* TREATMENTS */}

        <DashboardCard
          title="Tratamientos"
          icon={Pill}
          iconColor="text-green-400"
        >

          {treatments.length === 0 ? (

            <p className="text-gray-500">
              No hay tratamientos activos
            </p>

          ) : (

            <ul className="space-y-2">

              {treatments.map((t) => (

                <li key={t.id} className="text-sm">
                  {t.medication.name}
                </li>

              ))}

            </ul>

          )}

        </DashboardCard>


        {/* ALLERGIES */}

        <DashboardCard
          title="Alergias"
          icon={ShieldAlert}
          iconColor="text-yellow-400"
        >

          {active_allergies.length === 0 ? (

            <p className="text-gray-500">
              No hay alergias registradas
            </p>

          ) : (

            <ul className="space-y-2">

              {active_allergies.map((a) => (

                <li key={a.id}>
                  {a.allergy.name}
                </li>

              ))}

            </ul>

          )}

        </DashboardCard>

      </div>
    </div>
  )
}