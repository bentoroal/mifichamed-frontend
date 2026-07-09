"use client"

import { useCallback, useState } from "react"

import { getReportPdf, getReportPreview } from "../services/reportServices"
import type { ReportData, ReportFilters } from "../types"

const defaultFilters: ReportFilters = {
  includeProfile: true,
  includeConditions: true,
  includeTreatments: true,
  includeSymptoms: true,
  includeAllergies: true,
  includeSurgeries: true,
}

export function useReport() {
  const [filters, setFilters] = useState<ReportFilters>(defaultFilters)
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateFilter = useCallback(
    <Key extends keyof ReportFilters>(
      key: Key,
      value: ReportFilters[Key]
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    []
  )

  const generateReport = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getReportPreview(filters)
      setReport(data)
    } catch (err) {
      console.error(err)
      setError("No se pudo generar la vista previa del informe.")
    } finally {
      setLoading(false)
    }
  }, [filters])

  const downloadPdf = useCallback(async () => {
    try {
      setDownloadingPdf(true)
      setError(null)

      const blob = await getReportPdf(filters)
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = url
      link.download = `informe-medico-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      setError("No se pudo descargar el PDF del informe.")
    } finally {
      setDownloadingPdf(false)
    }
  }, [filters])

  const resetReport = useCallback(() => {
    setFilters(defaultFilters)
    setReport(null)
    setError(null)
  }, [])

  return {
    filters,
    setFilters,
    updateFilter,
    report,
    loading,
    downloadingPdf,
    error,
    generateReport,
    downloadPdf,
    resetReport,
  }
}
