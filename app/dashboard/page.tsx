"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Activity, Pill, Scissors, ShieldAlert, Stethoscope } from "lucide-react"
import { motion } from "motion/react"

import DashboardCard from "@/components/ui/DashboardCard"
import MetricCard from "@/components/ui/MetricCard"
import { DashboardData } from "@/features/dashboard/types"
import { getDashboard } from "@/lib/dashboard"

type SummaryTone = "red" | "blue" | "green" | "amber" | "violet"

type SummaryEntry = {
  id: number | string
  label: string
  meta: string
  badge?: string
  href: string
  tone: SummaryTone
}

const toneStyles: Record<
  SummaryTone,
  {
    item: string
    dot: string
    badge: string
  }
> = {
  red: {
    item: "border-red-100 bg-red-50/70 hover:bg-red-50",
    dot: "bg-red-400",
    badge: "bg-red-100 text-red-700",
  },
  blue: {
    item: "border-sky-100 bg-sky-50/70 hover:bg-sky-50",
    dot: "bg-sky-400",
    badge: "bg-sky-100 text-sky-700",
  },
  green: {
    item: "border-emerald-100 bg-emerald-50/70 hover:bg-emerald-50",
    dot: "bg-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    item: "border-amber-100 bg-amber-50/70 hover:bg-amber-50",
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700",
  },
  violet: {
    item: "border-violet-100 bg-violet-50/70 hover:bg-violet-50",
    dot: "bg-violet-400",
    badge: "bg-violet-100 text-violet-700",
  },
}

function DashboardSummaryList({
  items,
  emptyMessage,
  onItemClick,
}: {
  items: SummaryEntry[]
  emptyMessage: string
  onItemClick: (href: string) => void
}) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>
  }

  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const styles = toneStyles[item.tone]

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item.href)}
            className={[
              "group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
              "hover:shadow-sm hover:-translate-y-0.5",
              styles.item,
            ].join(" ")}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={["h-2.5 w-2.5 rounded-full shrink-0", styles.dot].join(" ")} />
                <p className="truncate text-sm font-semibold text-slate-800">
                  {item.label}
                </p>
              </div>

              <p className="mt-1 truncate pl-[18px] text-xs text-slate-500">
                {item.meta}
              </p>
            </div>

            {item.badge && (
              <span
                className={[
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
                  styles.badge,
                ].join(" ")}
              >
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadDashboard() {
      const dashboard = await getDashboard() as DashboardData

      if (!dashboard.profile || !dashboard.profile.weight || !dashboard.profile.height) {
        router.push("/onboarding/profile")
        return
      }

      setData(dashboard)
    }

    loadDashboard()
  }, [router])

  if (!data) {
    return <p className="p-6">Cargando dashboard...</p>
  }

  const {
    profile,
    active_conditions,
    active_symptoms,
    active_allergies,
    active_surgeries = [],
  } = data

  let bmi: number | string = "N/A"
  let bmiStatus = "Datos insuficientes"

  if (profile?.weight != null && profile?.height != null) {
    const heightInMeters = profile.height / 100

    bmi = profile.weight / (heightInMeters * heightInMeters)
    bmi = Number(bmi.toFixed(1))

    bmiStatus =
      bmi < 18.5 ? "Bajo peso" :
      bmi < 25 ? "Normal" :
      bmi < 30 ? "Sobrepeso" :
      "Obesidad"
  }

  const conditionStatusLabel: Record<string, string> = {
    active: "Activa",
    chronic: "Cronica",
    resolved: "Resuelta",
    remission: "Remision",
  }

  const conditionItems: SummaryEntry[] = active_conditions.map((condition) => ({
    id: condition.id,
    label: condition.condition?.name || "Condicion",
    meta: "Condicion en seguimiento",
    badge: conditionStatusLabel[condition.status] || condition.status,
    href: `/dashboard/conditions?selected=${condition.id}`,
    tone: "red",
  }))

  const symptomItems: SummaryEntry[] = active_symptoms.map((symptom) => ({
    id: symptom.id,
    label: symptom.symptom?.name || "Sintoma",
    meta: "Registro activo",
    badge: "Activo",
    href: `/dashboard/symptoms?selected=${symptom.id}`,
    tone: "blue",
  }))

  const treatmentItems: SummaryEntry[] = active_conditions.flatMap((condition) =>
    condition.treatments.map((treatment) => ({
      id: treatment.id,
      label: treatment.medication?.name || "Tratamiento",
      meta: `Para ${condition.condition?.name || "condicion asociada"}`,
      badge: conditionStatusLabel[condition.status] || condition.status,
      href: `/dashboard/treatments?selected=${treatment.id}`,
      tone: "green" as const,
    }))
  )

  const allergyItems: SummaryEntry[] = active_allergies.map((allergy) => ({
    id: allergy.id,
    label: allergy.allergy?.name || "Alergia",
    meta: "Alergia registrada",
    badge: "Activa",
    href: `/dashboard/allergies?selected=${allergy.id}`,
    tone: "amber",
  }))

  const surgeryItems: SummaryEntry[] = active_surgeries.map((surgery) => ({
    id: surgery.id,
    label: surgery.surgery?.name || "Cirugia",
    meta: surgery.surgery_date
      ? `Fecha ${surgery.surgery_date}`
      : "Fecha no indicada",
    badge: "Historial",
    href: `/dashboard/surgeries?selected=${surgery.id}`,
    tone: "violet",
  }))

  return (
    <div className="container mx-auto max-w-7xl p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="font-bold text-teal-600 mb-1">
          Hola {profile?.full_name}!
        </p>

        <h2 className="text-4xl font-black text-teal-950">
          Resumen de Salud
        </h2>
      </motion.div>

      <section className="mb-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <MetricCard label="Peso" value={profile?.weight ?? "N/A"} unit="kg" />
          <MetricCard label="Altura" value={profile?.height ?? "N/A"} unit="cms." />
          <MetricCard label="IMC" value={bmi} status={bmiStatus} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Enfermedades"
          icon={Activity}
          iconColor="text-red-400"
        >
          <DashboardSummaryList
            items={conditionItems}
            emptyMessage="No hay condiciones activas"
            onItemClick={(href) => router.push(href)}
          />
        </DashboardCard>

        <DashboardCard
          title="Sintomas"
          icon={Stethoscope}
          iconColor="text-blue-400"
        >
          <DashboardSummaryList
            items={symptomItems}
            emptyMessage="No hay sintomas activos"
            onItemClick={(href) => router.push(href)}
          />
        </DashboardCard>

        <DashboardCard
          title="Tratamientos"
          icon={Pill}
          iconColor="text-green-400"
        >
          <DashboardSummaryList
            items={treatmentItems}
            emptyMessage="No hay tratamientos activos"
            onItemClick={(href) => router.push(href)}
          />
        </DashboardCard>

        <DashboardCard
          title="Alergias"
          icon={ShieldAlert}
          iconColor="text-yellow-400"
        >
          <DashboardSummaryList
            items={allergyItems}
            emptyMessage="No hay alergias registradas"
            onItemClick={(href) => router.push(href)}
          />
        </DashboardCard>

        <DashboardCard
          title="Cirugias"
          icon={Scissors}
          iconColor="text-violet-400"
        >
          <DashboardSummaryList
            items={surgeryItems}
            emptyMessage="No hay cirugias registradas"
            onItemClick={(href) => router.push(href)}
          />
        </DashboardCard>
      </div>
    </div>
  )
}
