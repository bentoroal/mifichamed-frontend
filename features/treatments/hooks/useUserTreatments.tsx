"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { getUserConditions } from "@/features/conditions/services/conditionServices"
import {
  deleteUserTreatment,
  getMedications,
  getUserTreatments,
} from "../services/treatmentServices"
import {
  MedicationCatalogItem,
  TreatmentItem,
  UserConditionOption,
} from "../types"

function mergeTreatments(
  treatments: TreatmentItem[],
  conditions: UserConditionOption[],
  medications: MedicationCatalogItem[]
) {
  return treatments.map((treatment) => {
    const relatedCondition = conditions.find(
      (condition) => condition.id === treatment.user_condition_id
    )
    const relatedMedication = medications.find(
      (medication) => medication.id === treatment.medication_id
    )

    return {
      ...treatment,
      medication: relatedMedication
        ? {
            id: relatedMedication.id,
            name: relatedMedication.name,
          }
        : treatment.medication,
      conditionId: relatedCondition?.condition?.id,
      conditionName: relatedCondition?.condition?.name,
      conditionStatus: relatedCondition?.status,
    }
  })
}

export function useUserTreatments(initialSelectedId: number | null = null) {
  const [treatments, setTreatments] = useState<TreatmentItem[]>([])
  const [filtered, setFiltered] = useState<TreatmentItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(initialSelectedId)
  const [loading, setLoading] = useState(false)

  const selected = useMemo(() => {
    return treatments.find((treatment) => treatment.id === selectedId) || null
  }, [treatments, selectedId])

  const fetchTreatments = useCallback(async () => {
    try {
      setLoading(true)

      const [conditions, treatments, medications] = await Promise.all([
        getUserConditions() as Promise<UserConditionOption[]>,
        getUserTreatments(),
        getMedications(),
      ])
      const data = mergeTreatments(
        treatments || [],
        conditions || [],
        medications || []
      )

      setTreatments(data)
      setFiltered(data)

      if (!data.length) {
        setSelectedId(null)
        return
      }

      if (initialSelectedId) {
        const exists = data.some((treatment) => treatment.id === initialSelectedId)
        if (exists) {
          setSelectedId(initialSelectedId)
          return
        }
      }

      setSelectedId((prev) => {
        if (!prev) return data[0].id

        const exists = data.some((treatment) => treatment.id === prev)
        return exists ? prev : data[0].id
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [initialSelectedId])

  useEffect(() => {
    fetchTreatments()
  }, [fetchTreatments])

  const search = useCallback((query: string) => {
    if (!query) {
      setFiltered(treatments)
      return
    }

    const lower = query.toLowerCase()
    const filteredData = treatments.filter((treatment) => {
      const medicationLabel = treatment.medication?.name
        || (treatment.medication_id ? `medicamento ${treatment.medication_id}` : "")
      const conditionName = treatment.conditionName || ""

      return (
        medicationLabel.toLowerCase().includes(lower) ||
        conditionName.toLowerCase().includes(lower)
      )
    })

    setFiltered(filteredData)
  }, [treatments])

  const remove = useCallback(async (id: number) => {
    try {
      await deleteUserTreatment(id)

      setTreatments((prev) => prev.filter((treatment) => treatment.id !== id))
      setFiltered((prev) => prev.filter((treatment) => treatment.id !== id))

      if (selectedId === id) {
        setSelectedId(null)
      }
    } catch (err) {
      console.error(err)
    }
  }, [selectedId])

  return {
    treatments,
    filtered,
    selected,
    setSelected: setSelectedId,
    fetchTreatments,
    search,
    remove,
    loading,
  }
}
