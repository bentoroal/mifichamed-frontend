"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import {
  getUserSymptoms,
  deleteUserSymptom,
} from "../services/symptomServices"

export function useUserSymptoms(initialSelectedId: number | null = null) {
  const [symptoms, setSymptoms] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId)
  const [loading, setLoading] = useState(false)

  // 🔄 fetch
  const fetchSymptoms = useCallback(async () => {
    try {
      setLoading(true)

      const data = await getUserSymptoms()

      setSymptoms(data)
      setFiltered(data)

      // 🧠 si no hay selected aún, usar initial
      if (!selectedId && data.length > 0) {
        setSelectedId(data[0].id)
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [initialSelectedId, selectedId])

  useEffect(() => {
    fetchSymptoms()
  }, [fetchSymptoms])

  // 🧠 derivar selected SIEMPRE desde symptoms
  const selected = useMemo(() => {
    return symptoms.find((s) => s.id === selectedId) || null
  }, [symptoms, selectedId])

  // 🔍 search
  const search = useCallback((query: string) => {
    if (!query) {
      setFiltered(symptoms)
      return
    }

    const lower = query.toLowerCase()

    const filteredData = symptoms.filter((s: any) =>
      s.symptom?.name?.toLowerCase().includes(lower)
    )

    setFiltered(filteredData)
  }, [symptoms])

  // 🗑 delete
  const remove = useCallback(async (id: number) => {
    try {
      await deleteUserSymptom(id)

      setSymptoms((prev) => prev.filter((s) => s.id !== id))
      setFiltered((prev) => prev.filter((s) => s.id !== id))

      // si borras el seleccionado → limpiar
      if (selectedId === id) {
        setSelectedId(null)
      }

    } catch (err) {
      console.error(err)
    }
  }, [selectedId])

  return {
    symptoms,
    filtered,
    selected,
    setSelected: setSelectedId, 
    fetchSymptoms,
    search,
    remove,
    loading,
  }
}