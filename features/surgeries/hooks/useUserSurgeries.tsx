"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { getUserSurgeries, deleteUserSurgery } from "../services/surgeryServices"

export function useUserSurgeries(initialSelectedId: number | null = null) {
  const [surgeries, setSurgeries] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const selected = useMemo(() => {
    return surgeries.find((s) => s.id === selectedId) || null
  }, [surgeries, selectedId])

  const fetchSurgeries = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getUserSurgeries()
      setSurgeries(data)
      setFiltered(data)

      if (initialSelectedId) {
        const exists = data.some((s: any) => s.id === initialSelectedId)
        if (exists) {
          setSelectedId(initialSelectedId)
          return
        }
      }

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
    fetchSurgeries()
  }, [fetchSurgeries])

  const searchSurgeries = useCallback(
    (query: string) => {
      if (!query) {
        setFiltered(surgeries)
        return
      }

      const lower = query.toLowerCase()
      const filteredData = surgeries.filter((s: any) =>
        s.surgery?.name?.toLowerCase().includes(lower)
      )

      setFiltered(filteredData)
    },
    [surgeries]
  )

  const remove = useCallback(
    async (id: number) => {
      try {
        await deleteUserSurgery(id)
        setSurgeries((prev) => prev.filter((s) => s.id !== id))
        setFiltered((prev) => prev.filter((s) => s.id !== id))

        if (selectedId === id) {
          setSelectedId(null)
        }
      } catch (err) {
        console.error(err)
      }
    },
    [selectedId]
  )

  return {
    surgeries,
    filtered,
    selected,
    selectedId,
    setSelected: setSelectedId,
    fetchSurgeries,
    search: searchSurgeries,
    setSearch,
    remove,
    loading,
  }
}
