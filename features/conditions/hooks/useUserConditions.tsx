"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { apiFetch } from "@/lib/api"
import { deleteUserCondition } from "../services/conditionServices"

export function useUserConditions(initialSelectedId?: number | null) {
  const [conditions, setConditions] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId ?? null)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const selected = useMemo(() => {
    return conditions.find((c) => c.id === selectedId) || null
  }, [conditions, selectedId])

  // -----------------------------
  // FETCH
  // -----------------------------
  const fetchConditions = async () => {
    try {
      setLoading(true)

      const data = await apiFetch("/user-conditions/")
      setConditions(data)
      setFiltered(data)

      // 🎯 lógica correcta con IDs
      if (!data || data.length === 0) {
        setSelectedId(null)
        return
      }

      // prioridad: URL
      if (initialSelectedId) {
        const exists = data.some((c: any) => c.id === initialSelectedId)
        if (exists) {
          setSelectedId(initialSelectedId)
          return
        }
      }

      // fallback: primer elemento
      setSelectedId((prev) => {
        if (!prev) return data[0].id

        const exists = data.some((c: any) => c.id === prev)
        return exists ? prev : data[0].id
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

  // -----------------------------
  // FILTER
  // -----------------------------
  const searchConditions = useCallback((query: string) => {
    if (!query) {
      setFiltered(conditions)
      return
    }

    const lower = query.toLowerCase()

    const filteredData = conditions.filter((c: any) =>
      c.condition?.name?.toLowerCase().includes(lower)
    )

    setFiltered(filteredData)
  }, [conditions])

  // -----------------------------
  // REMOVE
  // -----------------------------
  const remove = useCallback(async (id: number) => {
    try {
      await deleteUserCondition(id)

      setConditions((prev) => prev.filter((c) => c.id !== id))
      setFiltered((prev) => prev.filter((c) => c.id !== id))

      // si borras el seleccionado → limpiar
      if (selectedId === id) {
        setSelectedId(null)
      }

    } catch (err) {
      console.error(err)
    }
  }, [selectedId])

  return {
    conditions,
    filtered,
    selected,
    selectedId,        // 👈 útil para debug/UI
    setSelected: setSelectedId,
    fetchConditions,
    search: searchConditions,
    setSearch,
    remove,
    loading,
  }
}