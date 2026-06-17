import { useState, useEffect } from 'react'

export default function useMovies(fetchFn, deps = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const fetch = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetchFn()
        if (!cancelled) setData(res.data.results || res.data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetch()
    return () => { cancelled = true }
  }, deps)

  return { data, loading, error }
}