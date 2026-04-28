"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import DashboardHeader from "@/components/ui/DashboardHeader"
import TreatmentList from "@/features/treatments/components/TreatmentList"
import TreatmentDetail from "@/features/treatments/components/TreatmentDetail"
import TreatmentModal from "@/features/treatments/components/TreatmentModal"
import { useUserTreatments } from "@/features/treatments/hooks/useUserTreatments"

export default function TreatmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const selectedFromUrl = searchParams.get("selected")

  const {
    filtered,
    selected,
    setSelected,
    fetchTreatments,
    search,
    remove,
  } = useUserTreatments(
    selectedFromUrl ? Number(selectedFromUrl) : null
  )

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <TreatmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchTreatments}
        />

        <DashboardHeader
          title="Tratamientos"
          placeholder="Ej: Metformina o diabetes"
          onSearch={search}
          onAdd={() => setIsModalOpen(true)}
        />

        <div className="flex gap-6 items-start">
          <div className="w-2/5">
            <TreatmentList
              treatments={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="w-3/5">
            <TreatmentDetail
              treatment={selected}
              refresh={fetchTreatments}
              onDelete={remove}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
