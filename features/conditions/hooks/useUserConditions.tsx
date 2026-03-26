"use client"

import { useState, useEffect, useMemo } from "react"
import { apiFetch } from "@/lib/api"

export function useUserConditions(initialSelectedId?: number | null) {
  // 🔹 Lista completa desde backend
  const [conditions, setConditions] = useState<any[]>([])

  // 🔹 Condición actualmente seleccionada
  const [selected, setSelected] = useState<any | null>(null)

  // 🔹 Estado de carga
  const [loading, setLoading] = useState(false)

  // 🔹 Texto de búsqueda
  const [query, setQuery] = useState("")

  // 🔸 Fetch principal de condiciones
  const fetchConditions = async () => {
    try {
      setLoading(true)

      const data = await apiFetch("/user-conditions/")

      setConditions(data)

      
      setSelected((prev: any) => {
        if (!data || data.length === 0) return null

        // 🔥 PRIORIDAD: selección desde URL
        if (initialSelectedId) {
          const fromUrl = data.find((c: any) => c.id === initialSelectedId)
          if (fromUrl) return fromUrl
        }

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

  // 🔸 Cargar datos al montar
  useEffect(() => {
    fetchConditions()
  }, [])

  // 🔸 Lista filtrada (DERIVADA, no estado)
  const filtered = useMemo(() => {
    if (!query) return conditions

    return conditions.filter((c) =>
      c.condition?.name?.toLowerCase().includes(query.toLowerCase())
    )
  }, [conditions, query])

  // 🔸 🔥 CLAVE: mantener selected sincronizado con filtered
  useEffect(() => {
    // Si no hay elementos → nada seleccionado
    if (!filtered.length) {
      setSelected(null)
      return
    }

    // Verifica si el seleccionado actual sigue existiendo en el filtro
    const exists = filtered.find((c) => c.id === selected?.id)

    // Si no existe → selecciona el primero automáticamente
    if (!exists) {
      setSelected(filtered[0])
    }

  }, [filtered])

  // 🔸 Búsqueda (solo actualiza query, el effect hace el resto)
  const search = (value: string) => {
    setQuery(value)
  }

  return {
    conditions,   // lista completa
    filtered,     // lista filtrada
    selected,     // seleccionado actual
    setSelected,  // selección manual (click en lista)
    fetchConditions,
    search,
    loading,
  }
}