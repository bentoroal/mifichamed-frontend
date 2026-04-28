"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import {
  deleteUserAllergy,
  getAllergiesCatalog,
  getUserAllergies,
} from "../services/allergyServices"
import { AllergyCatalogItem, AllergyItem } from "../types"

function mergeAllergies(
  allergies: AllergyItem[],
  catalog: AllergyCatalogItem[]
) {
  return allergies.map((allergy) => {
    const catalogItem = catalog.find((item) => item.id === allergy.allergy_id)

    return {
      ...allergy,
      allergy: catalogItem
        ? {
            id: catalogItem.id,
            name: catalogItem.name,
          }
        : allergy.allergy,
    }
  })
}

export function useUserAllergies(initialSelectedId: number | null = null) {
  const [allergies, setAllergies] = useState<AllergyItem[]>([])
  const [filtered, setFiltered] = useState<AllergyItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId)
  const [loading, setLoading] = useState(false)

  const selected = useMemo(() => {
    return allergies.find((allergy) => allergy.id === selectedId) || null
  }, [allergies, selectedId])

  const fetchAllergies = useCallback(async () => {
    try {
      setLoading(true)

      const [allergies, catalog] = await Promise.all([
        getUserAllergies(),
        getAllergiesCatalog(),
      ])
      const data = mergeAllergies(allergies || [], catalog || [])

      setAllergies(data)
      setFiltered(data)

      if (!data.length) {
        setSelectedId(null)
        return
      }

      if (initialSelectedId) {
        const exists = data.some((allergy) => allergy.id === initialSelectedId)
        if (exists) {
          setSelectedId(initialSelectedId)
          return
        }
      }

      setSelectedId((prev) => {
        if (!prev) return data[0].id

        const exists = data.some((allergy) => allergy.id === prev)
        return exists ? prev : data[0].id
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [initialSelectedId])

  useEffect(() => {
    fetchAllergies()
  }, [fetchAllergies])

  const search = useCallback((query: string) => {
    if (!query) {
      setFiltered(allergies)
      return
    }

    const lower = query.toLowerCase()
    const filteredData = allergies.filter((allergy) =>
      allergy.allergy?.name?.toLowerCase().includes(lower)
    )

    setFiltered(filteredData)
  }, [allergies])

  const remove = useCallback(async (id: number) => {
    try {
      await deleteUserAllergy(id)

      setAllergies((prev) => prev.filter((allergy) => allergy.id !== id))
      setFiltered((prev) => prev.filter((allergy) => allergy.id !== id))

      if (selectedId === id) {
        setSelectedId(null)
      }
    } catch (err) {
      console.error(err)
    }
  }, [selectedId])

  return {
    allergies,
    filtered,
    selected,
    setSelected: setSelectedId,
    fetchAllergies,
    search,
    remove,
    loading,
  }
}
