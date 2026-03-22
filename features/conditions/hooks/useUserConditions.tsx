"use client"

import { useState, useEffect, useMemo } from "react"
import { apiFetch } from "@/lib/api"

export function useUserConditions() {
  const [conditions, setConditions] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")

  const fetchConditions = async () => {
    try {
      setLoading(true)

      const data = await apiFetch("/user-conditions/")

      setConditions(data)

      setSelected((prev: any) => {
        if (!data || data.length === 0) return null
        if (!prev) return data[0]

        const found = data.find((c: any) => c.id === prev.id)
        return found ? found : data[0]
      })

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConditions()
  }, [])

  // DERIVADO, NO STATE
  const filtered = useMemo(() => {
    if (!query) return conditions

    return conditions.filter((c) =>
      c.condition?.name?.toLowerCase().includes(query.toLowerCase())
    )
  }, [conditions, query])

  const search = (value: string) => {
    setQuery(value)

    // opcional: actualizar selected
    const match = conditions.find((c) =>
      c.condition?.name?.toLowerCase().includes(value.toLowerCase())
    )

    setSelected(match || conditions[0] || null)
  }

  return {
    conditions,
    filtered,
    selected,
    setSelected,
    fetchConditions,
    search,
    loading,
  }
}