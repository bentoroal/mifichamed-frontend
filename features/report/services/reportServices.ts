import { apiFetch } from "@/lib/api"
import type { ReportData, ReportFilters } from "../types"

const REPORT_PREVIEW_ENDPOINT = "/reports/preview/"
const REPORT_PDF_ENDPOINT = "/reports/pdf/"

const buildReportPayload = (filters: ReportFilters) => ({
  includeProfile: filters.includeProfile ?? true,
  includeConditions: filters.includeConditions ?? true,
  includeTreatments: filters.includeTreatments ?? true,
  includeSymptoms: filters.includeSymptoms ?? true,
  includeAllergies: filters.includeAllergies ?? true,
  includeSurgeries: filters.includeSurgeries ?? true,
})

export const getReportPreview = (filters: ReportFilters) => {
  return apiFetch(REPORT_PREVIEW_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(buildReportPayload(filters)),
  }) as Promise<ReportData>
}

export const getReportPdf = async (filters: ReportFilters) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  const token = localStorage.getItem("token")
  const payload = buildReportPayload(filters)

  const res = await fetch(`${API_URL}${REPORT_PDF_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  })

  if (res.status === 401) {
    localStorage.removeItem("token")
    window.location.href = "/"
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    let message = `HTTP ${res.status}: ${res.statusText}`

    try {
      const errorData = await res.json()
      const backendMessage =
        typeof errorData?.message === "string"
          ? errorData.message
          : typeof errorData?.error === "string"
            ? errorData.error
            : null

      if (backendMessage) {
        message = backendMessage
      }
    } catch {
      // Ignore JSON parse errors and use the default message.
    }

    throw new Error(message)
  }

  return res.blob()
}
