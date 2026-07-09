"use client"

import {
  Activity,
  Download,
  Eye,
  Pill,
  Scissors,
  ShieldAlert,
  Stethoscope,
  User,
} from "lucide-react"
import type { ReactNode } from "react"

import { formatDateDDMMYYYY } from "@/lib/dateUtils"
import { getHabitLabel, getStatusLabel } from "@/lib/labels"
import type {
  ReportAllergy,
  ReportCondition,
  ReportData,
  ReportFilters,
  ReportSurgery,
  ReportSymptom,
  ReportTreatment,
} from "../types"

type ReportPreviewCardProps = {
  report: ReportData | null
  filters: ReportFilters
  loading: boolean
  downloadingPdf: boolean
  onDownloadPdf: () => void
}

type PreviewSectionProps = {
  title: string
  icon: ReactNode
  children: ReactNode
}

function normalizeProfileValue(value: string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return ""
  }

  return value.toString().trim().toLowerCase()
}

function getProfileHabitValue(
  profile: ReportData["profile"],
  keys: string[]
) {
  if (!profile) {
    return null
  }

  const candidateValues = keys.flatMap((key) => {
    const value = (profile as Record<string, unknown>)[key]

    if (value === null || value === undefined || value === "") {
      return []
    }

    if (typeof value === "string") {
      return [value]
    }

    if (typeof value === "object") {
      const nestedValue = (value as Record<string, unknown>).value
      if (typeof nestedValue === "string") {
        return [nestedValue]
      }
    }

    return []
  })

  return candidateValues[0] ?? null
}

function getReportHabitLabel(value: unknown, kind: "alcohol" | "smoking" | "physicalActivity") {
  return getHabitLabel(value, kind)
}

function PreviewSection({ title, icon, children }: PreviewSectionProps) {
  return (
    <section className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
          {icon}
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  )
}

function EmptySectionMessage({ text }: { text: string }) {
  return <p className="text-sm text-slate-500">{text}</p>
}

function ItemCard({
  title,
  meta,
  notes,
}: {
  title: string
  meta?: string
  notes?: string | null
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="font-semibold text-slate-800">{title}</p>

      {meta && <p className="mt-1 text-xs font-medium text-slate-500">{meta}</p>}

      <p className="mt-2 text-sm text-slate-600">
        {notes || "Sin notas registradas"}
      </p>
    </article>
  )
}

function renderCondition(condition: ReportCondition) {
  const status = getStatusLabel(condition.status)

  return (
    <ItemCard
      key={condition.id}
      title={condition.condition?.name || "Condicion sin nombre"}
      meta={`${status} | Inicio: ${formatDateDDMMYYYY(condition.start_date)}`}
      notes={condition.notes}
    />
  )
}

function renderTreatment(treatment: ReportTreatment) {
  const details = [
    treatment.dosage,
    treatment.frequency,
    treatment.start_date
      ? `Inicio: ${formatDateDDMMYYYY(treatment.start_date)}`
      : null,
  ].filter(Boolean)

  return (
    <ItemCard
      key={treatment.id}
      title={treatment.medication?.name || "Tratamiento sin nombre"}
      meta={details.join(" | ")}
      notes={treatment.notes}
    />
  )
}

function renderSymptom(symptom: ReportSymptom) {
  return (
    <ItemCard
      key={symptom.id}
      title={symptom.symptom?.name || "Sintoma sin nombre"}
      notes={symptom.notes}
    />
  )
}

function renderAllergy(allergy: ReportAllergy) {
  const status = getStatusLabel(allergy.status)

  return (
    <ItemCard
      key={allergy.id}
      title={allergy.allergy?.name || "Alergia sin nombre"}
      meta={`${status} | Inicio: ${formatDateDDMMYYYY(allergy.start_date)}`}
      notes={allergy.notes}
    />
  )
}

function renderSurgery(surgery: ReportSurgery) {
  return (
    <ItemCard
      key={surgery.id}
      title={surgery.surgery?.name || "Cirugia sin nombre"}
      meta={`Fecha: ${formatDateDDMMYYYY(surgery.surgery_date)}`}
      notes={surgery.notes}
    />
  )
}

export default function ReportPreviewCard({
  report,
  filters,
  loading,
  downloadingPdf,
  onDownloadPdf,
}: ReportPreviewCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
        Generando vista previa...
      </div>
    )
  }

  const alcoholValue = getProfileHabitValue(report?.profile, [
    "alcohol_consumption",
    "alcohol",
    "alcoholConsumption",
  ])
  const smokingValue = getProfileHabitValue(report?.profile, [
    "smoking_habits",
    "smoking",
    "smokingHabits",
  ])
  const physicalActivityValue = getProfileHabitValue(report?.profile, [
    "physical_activity",
    "physicalActivity",
  ])

  if (!report) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Eye className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-bold text-slate-700">Vista previa</h2>
            <p className="mt-1 text-sm">
              Configura los filtros y genera el informe para revisarlo aqui.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Vista previa</h2>
          <p className="mt-1 text-sm text-slate-500">
            Generado: {formatDateDDMMYYYY(report.generatedAt?.split("T")[0])}
          </p>
        </div>

        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={downloadingPdf}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {downloadingPdf ? "Descargando..." : "Descargar PDF"}
        </button>
      </div>

      <div className="space-y-4">
        {filters.includeProfile && report?.profile && (
          <PreviewSection
            title="Perfil"
            icon={<User className="h-4 w-4" />}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Nombre
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {report.profile.full_name || "Sin nombre"}
                </p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Peso
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {report.profile.weight ?? "--"} kg
                </p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Altura
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {report.profile.height ?? "--"} cm
                </p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Alcohol
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {getReportHabitLabel(alcoholValue, "alcohol")}
                </p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Tabaco
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {getReportHabitLabel(smokingValue, "smoking")}
                </p>
              </div>

              <div className="rounded-lg bg-white p-3">
                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Actividad física
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {getReportHabitLabel(physicalActivityValue, "physicalActivity")}
                </p>
              </div>
            </div>
          </PreviewSection>
        )}

        {filters.includeConditions && report?.conditions && (
          <PreviewSection
            title="Condiciones"
            icon={<Activity className="h-4 w-4" />}
          >
            {report.conditions.length > 0 ? (
              report.conditions.map(renderCondition)
            ) : (
              <EmptySectionMessage text="No hay condiciones registradas." />
            )}
          </PreviewSection>
        )}

        {filters.includeTreatments && report?.treatments && (
          <PreviewSection
            title="Tratamientos"
            icon={<Pill className="h-4 w-4" />}
          >
            {report.treatments.length > 0 ? (
              report.treatments.map(renderTreatment)
            ) : (
              <EmptySectionMessage text="No hay tratamientos registrados." />
            )}
          </PreviewSection>
        )}

        {filters.includeSymptoms && report?.symptoms && (
          <PreviewSection
            title="Sintomas"
            icon={<Stethoscope className="h-4 w-4" />}
          >
            {report.symptoms.length > 0 ? (
              report.symptoms.map(renderSymptom)
            ) : (
              <EmptySectionMessage text="No hay sintomas registrados." />
            )}
          </PreviewSection>
        )}

        {filters.includeAllergies && report?.allergies && (
          <PreviewSection
            title="Alergias"
            icon={<ShieldAlert className="h-4 w-4" />}
          >
            {report.allergies.length > 0 ? (
              report.allergies.map(renderAllergy)
            ) : (
              <EmptySectionMessage text="No hay alergias registradas." />
            )}
          </PreviewSection>
        )}

        {filters.includeSurgeries && report?.surgeries && (
          <PreviewSection
            title="Cirugias"
            icon={<Scissors className="h-4 w-4" />}
          >
            {report.surgeries.length > 0 ? (
              report.surgeries.map(renderSurgery)
            ) : (
              <EmptySectionMessage text="No hay cirugias registradas." />
            )}
          </PreviewSection>
        )}
      </div>
    </div>
  )
}
