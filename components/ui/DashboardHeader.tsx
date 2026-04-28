"use client"

import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"

export default function DashboardHeader({
  title,
  placeholder = "Buscar...",
  onSearch,
  onAdd,
}: any) {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 400)
  const canAdd = typeof onAdd === "function"

  useEffect(() => {
    onSearch?.(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="text-sm text-slate-400">
        MiFichaMed /{" "}
        <span className="font-medium text-slate-900">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-64 rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        {canAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-secondary hover:shadow-md active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Anadir
          </button>
        )}
      </div>
    </div>
  )
}
