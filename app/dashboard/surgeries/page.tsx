"use client"    

import SurgeryList from "@/features/surgeries/components/SurgeryList"
import SurgeryDetail from "@/features/surgeries/components/SurgeryDetail"
import SurgeryModal from "@/features/surgeries/components/SurgeryModal"
import DashboardHeader from "@/components/ui/DashboardHeader"
import { useUserSurgeries } from "@/features/surgeries/hooks/useUserSurgeries"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SurgeriesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const searchParams = useSearchParams()
    const selectedFromUrl = searchParams.get("selected")

    const {
        filtered,
        selected,
        setSelected,
        fetchSurgeries,
        search,
        remove,
    } = useUserSurgeries(
        selectedFromUrl ? Number(selectedFromUrl) : null
    )
    //Conectar Header con hook
    const handleSearch = (value: string) => {
        search(value)
    }

    const handleAdd = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <SurgeryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchSurgeries}
                />
                {/* HEADER */}
                <DashboardHeader
                    title="Cirugías"
                    placeholder="Ej: Colisectomia"
                    onSearch={handleSearch}
                    onAdd={handleAdd}
                />
                {/* CONTENIDO */}
                <div className="flex gap-6 items-start">
                    {/* LISTA */}
                    <div className="w-2/5">
                        <SurgeryList
                            surgeries={filtered}
                            selected={selected}
                            onSelect={setSelected}
                        />
                    </div>
                    {/* DETALLE */}
                    <div className="w-3/5">
                        <SurgeryDetail 
                            surgery={selected} 
                            refresh={fetchSurgeries}
                            onDelete={remove}    
                        />
                    </div>
                </div>

            </div>
        </div>

    )

}