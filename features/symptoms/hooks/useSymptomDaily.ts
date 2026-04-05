import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import {
  getDaily,
  upsertDaily,
} from "../services/symptomServices"

export function useSymptomDaily(symptomId: number, date: Date) {
  const [severity, setSeverity] = useState(1)
  const debouncedSeverity = useDebounce(severity, 500)

  const formattedDate = date.toISOString().split("T")[0]

  // 🔄 load
  useEffect(() => {
    if (!symptomId) return

    const load = async () => {
      try {
        const data = await getDaily(symptomId, formattedDate)
        setSeverity(data?.severity || 1)
      } catch (err) {
        console.error(err)
      }
    }

    load()
  }, [symptomId, formattedDate])

  // 💾 autosave
  useEffect(() => {
    if (!symptomId) return

    const save = async () => {
      try {
        await upsertDaily(symptomId, formattedDate, debouncedSeverity)
      } catch (err) {
        console.error(err)
      }
    }

    save()
  }, [debouncedSeverity, symptomId, formattedDate])

  return { severity, setSeverity }
}