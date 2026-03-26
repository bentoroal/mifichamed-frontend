"use client"

import ConditionList from "@/features/conditions/components/ConditionList"
import ConditionDetail from "@/features/conditions/components/ConditionDetail"
import ConditionsHeader from "@/features/conditions/components/ConditionsHeader"
import ConditionModal from "@/features/conditions/components/ConditionModal"
import { useUserConditions } from "@/features/conditions/hooks/useUserConditions"
import { useSearchParams } from "next/navigation"

import { useState } from "react"

export default function ConditionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const selectedFromUrl = searchParams.get("selected")

  const {
    filtered,
    selected,
    setSelected,
    fetchConditions,
    search,
  } = useUserConditions(
    selectedFromUrl ? Number(selectedFromUrl) : null
  )

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        <ConditionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchConditions}
        />

        {/* HEADER */}
        <ConditionsHeader
          onSearch={search}
          onAdd={() => setIsModalOpen(true)}
        />

        {/* CONTENEDOR PRINCIPAL */}
        <div className="flex gap-6 items-start">

          {/* COLUMNA IZQUIERDA: Listado */}
          <div className="w-2/5">
            <ConditionList
              conditions={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          {/* COLUMNA DERECHA: Detalle */}
          <div className="w-3/5">
            {/* Si el detalle está vacío, este div mantendrá la alineación superior */}
            <div className="flex flex-col">
              <ConditionDetail
                condition={selected}
                refresh={fetchConditions}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}