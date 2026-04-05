"use client"

import SymptomList from "@/features/symptoms/components/SymptomList"
import SymptomDetail from "@/features/symptoms/components/SymptomDetail"
import DashboardHeader from "@/components/ui/DashboardHeader"
import SymptomModal from "@/features/symptoms/components/SymptomModal"
import { useUserSymptoms } from "@/features/symptoms/hooks/useUserSymptom"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SymptomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const selectedFromUrl = searchParams.get("selected")

  const {
    filtered,
    selected,
    setSelected,
    fetchSymptoms,
    search,
    remove,
  } = useUserSymptoms(
    selectedFromUrl ? Number(selectedFromUrl) : null
  )

  // 🔹 conectar header con hook
  const handleSearch = (value: string) => {
    search(value)
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        <SymptomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchSymptoms}
        />

        {/* HEADER */}
        <DashboardHeader
          title="Síntomas"
          placeholder="Ej: Dolor de cabeza"
          onSearch={handleSearch}
          onAdd={handleAdd}
        />

        {/* CONTENIDO */}
        <div className="flex gap-6 items-start">

          {/* LISTA */}
          <div className="w-2/5">
            <SymptomList
              symptoms={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          {/* DETALLE */}
          <div className="w-3/5">
            <SymptomDetail
              symptom={selected}
              refresh={fetchSymptoms}
              onDelete={remove}
            />
          </div>

        </div>
      </div>
    </div>
  )
}