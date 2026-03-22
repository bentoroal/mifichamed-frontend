import { useEffect, useState } from "react"

export function useFetch(fetchFn: () => Promise<any>, enabled = true) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetchFn()
      setData(res)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) return
    fetchData()
  }, [enabled])

  return { data, loading, error, refetch: fetchData }
}