"use client"

import { useEffect, useRef, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { updateUserSymptom } from "../services/symptomServices"

export function useSymptomDetail(symptom: any) {
  const [notes, setNotes] = useState("")

  const debouncedNotes = useDebounce(notes, 800)

  // 🔥 para evitar autosave en mount
  const isFirstRender = useRef(true)

  // -----------------------------
  // SYNC INICIAL
  // -----------------------------
  useEffect(() => {
    if (symptom) {
      setNotes(symptom.notes || "")
    }
  }, [symptom])


  // -----------------------------
  // AUTOSAVE NOTES
  // -----------------------------
  useEffect(() => {
    if (!symptom) return

    if (isFirstRender.current) return

    const update = async () => {
      try {
        await updateUserSymptom(symptom.id, {
          notes: debouncedNotes,
        })
      } catch (err) {
        console.error("Error notas", err)
      }
    }

    update()
  }, [debouncedNotes, symptom?.id])

  // 🔥 marcar que ya pasó el primer render
  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return {
    notes,
    setNotes,
  }
}