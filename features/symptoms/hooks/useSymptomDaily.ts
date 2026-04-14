import { useEffect, useState, useRef } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
  getDaily,
  upsertDaily,
} from "../services/symptomServices"

type SaveStatus = "idle" | "saving" | "saved" | "error"

export function useSymptomDaily(symptomId: number, date: Date) {
  const [severity, setSeverity] = useState(1)
  const [status, setStatus] = useState<SaveStatus>("idle")

  const debouncedSeverity = useDebounce(severity, 300)
  const formattedDate = date.toISOString().split("T")[0]

  const hasLoaded = useRef(false)
  const lastSavedSeverity = useRef<number | null>(null)
  const saveTimeout = useRef<NodeJS.Timeout | null>(null)

  // 🔄 load
  useEffect(() => {
    if (!symptomId) return

    const load = async () => {
      try {
        const data = await getDaily(symptomId, formattedDate)
        const initialSeverity = data?.severity || 1

        setSeverity(initialSeverity)
        lastSavedSeverity.current = initialSeverity
        hasLoaded.current = true
      } catch (err) {
        console.error(err)
      }
    }

    load()
  }, [symptomId, formattedDate])

  // 💾 autosave con feedback
  useEffect(() => {
    if (!symptomId) return
    if (!hasLoaded.current) return

    if (debouncedSeverity === lastSavedSeverity.current) return

    const save = async () => {
      try {
        setStatus("saving")

        await upsertDaily(symptomId, formattedDate, debouncedSeverity)

        lastSavedSeverity.current = debouncedSeverity
        setStatus("saved")

        // ⏱️ volver a idle después de 1.5s
        if (saveTimeout.current) clearTimeout(saveTimeout.current)

        saveTimeout.current = setTimeout(() => {
          setStatus("idle")
        }, 1500)
      } catch (err) {
        console.error(err)
        setStatus("error")
      }
    }

    save()
  }, [debouncedSeverity, symptomId, formattedDate])

  return { severity, setSeverity, status }
}