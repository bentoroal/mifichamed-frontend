"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import DashboardHeader from "@/components/ui/DashboardHeader"
import AllergyList from "@/features/allergies/components/AllergyList"
import AllergyDetail from "@/features/allergies/components/AllergyDetail"
import AllergyModal from "@/features/allergies/components/AllergyModal"
import { useUserAllergies } from "@/features/allergies/hooks/useUserAllergies"

export default function AllergiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const selectedFromUrl = searchParams.get("selected")

  const {
    filtered,
    selected,
    setSelected,
    fetchAllergies,
    search,
    remove,
  } = useUserAllergies(
    selectedFromUrl ? Number(selectedFromUrl) : null
  )

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <AllergyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchAllergies}
        />

        <DashboardHeader
          title="Alergias"
          placeholder="Ej: Penicilina"
          onSearch={search}
          onAdd={() => setIsModalOpen(true)}
        />

        <div className="flex gap-6 items-start">
          <div className="w-2/5">
            <AllergyList
              allergies={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          <div className="w-3/5">
            <AllergyDetail
              allergy={selected}
              refresh={fetchAllergies}
              onDelete={remove}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
