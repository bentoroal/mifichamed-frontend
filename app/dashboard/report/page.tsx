"use client"

import { FileText } from "lucide-react"

import ReportFilterCard from "@/features/report/components/ReportFilterCard"
import ReportPreviewCard from "@/features/report/components/ReportPreviewCard"
import { useReport } from "@/features/report/hooks/useReport"

export default function ReportPage() {
  const {
    filters,
    updateFilter,
    report,
    loading,
    downloadingPdf,
    error,
    generateReport,
    downloadPdf,
    resetReport,
  } = useReport()

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-primary">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm text-slate-400">
              MiFichaMed /{" "}
              <span className="font-medium text-slate-900">Informe</span>
            </p>
            <h1 className="text-2xl font-bold text-slate-900">
              Informe medico
            </h1>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-start gap-6">
          <div className="w-2/5">
            <ReportFilterCard
              filters={filters}
              onFilterChange={updateFilter}
              onGenerate={generateReport}
              onReset={resetReport}
              loading={loading}
            />
          </div>

          <div className="w-3/5">
            <ReportPreviewCard
              report={report}
              filters={filters}
              loading={loading}
              downloadingPdf={downloadingPdf}
              onDownloadPdf={downloadPdf}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
