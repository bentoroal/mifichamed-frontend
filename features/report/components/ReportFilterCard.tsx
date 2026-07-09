"use client"

import { FileText, RotateCcw } from "lucide-react"

import type { ReportFilters } from "../types"

type ReportFilterKey = Exclude<
  keyof ReportFilters,
  "dateFrom" | "dateTo"
>

type ReportFilterCardProps = {
  filters: ReportFilters
  onFilterChange: <Key extends keyof ReportFilters>(
    key: Key,
    value: ReportFilters[Key]
  ) => void
  onGenerate: () => void
  onReset: () => void
  loading: boolean
}

type SwitchProps = {
  checked: boolean
  label: string
  description?: string
  onChange: (checked: boolean) => void
}

const reportOptions: {
  key: ReportFilterKey
  label: string
  description: string
}[] = [
  {
    key: "includeProfile",
    label: "Perfil",
    description: "Datos basicos del paciente.",
  },
  {
    key: "includeConditions",
    label: "Condiciones",
    description: "Enfermedades o condiciones registradas.",
  },
  {
    key: "includeTreatments",
    label: "Tratamientos",
    description: "Medicamentos, dosis y frecuencias.",
  },
  {
    key: "includeSymptoms",
    label: "Sintomas",
    description: "Sintomas registrados en la ficha.",
  },
  {
    key: "includeAllergies",
    label: "Alergias",
    description: "Alergias activas o historicas.",
  },
  {
    key: "includeSurgeries",
    label: "Cirugias",
    description: "Procedimientos quirurgicos registrados.",
  },
]

function Switch({ checked, label, description, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-primary/40 hover:bg-slate-50"
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-800">
          {label}
        </span>

        {description && (
          <span className="mt-1 block text-xs text-slate-500">
            {description}
          </span>
        )}
      </span>

      <span
        className={[
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-slate-300",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </span>
    </button>
  )
}

export default function ReportFilterCard({
  filters,
  onFilterChange,
  onGenerate,
  onReset,
  loading,
}: ReportFilterCardProps) {
  const allFiltersEnabled = reportOptions.every((option) => filters[option.key])

  const handleToggleAll = (checked: boolean) => {
    reportOptions.forEach((option) => {
      onFilterChange(option.key, checked)
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-primary">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Filtros del informe
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Elige que secciones incluir en la vista previa y el PDF.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Switch
          checked={allFiltersEnabled}
          label="Incluir todo"
          description="Activa o desactiva todas las secciones del informe."
          onChange={handleToggleAll}
        />

        <div className="h-px bg-slate-100" />

        {reportOptions.map((option) => (
          <Switch
            key={option.key}
            checked={filters[option.key]}
            label={option.label}
            description={option.description}
            onChange={(checked) => onFilterChange(option.key, checked)}
          />
        ))}
      </div>


      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generando..." : "Generar vista previa"}
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Restablecer filtros"
          title="Restablecer filtros"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
