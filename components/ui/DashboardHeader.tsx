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

  useEffect(() => {
    onSearch?.(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <div className="flex items-center justify-between mb-6">

      {/* LEFT */}
      <div className="text-sm text-slate-400">
        MiFichaMed /{" "}
        <span className="font-medium text-slate-900">{title}</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary w-64"
          />
        </div>

        {/* ADD */}
        <button
          onClick={onAdd}
          className="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Añadir
        </button>

      </div>
    </div>
  )
}