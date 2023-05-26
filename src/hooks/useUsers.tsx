import { getUsersPage } from '@/utils/axios'
import { useEffect, useState } from 'react'

export default function useUsers(page = 0) {
  const [results, setResults] = useState<GHUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<{ message?: string }>({})
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      setError({})

      const controller = new AbortController()
      const { signal } = controller

      try {
        const data = await getUsersPage(page, { signal })
        setResults(prev => [...prev, ...data])
        setHasNextPage(Boolean(data.length))
        setIsLoading(false)
      } catch (e: any) {
        setIsLoading(false)
        if (signal.aborted) return
        setIsError(true)
        setError({ message: e?.message })
      }
    }
    fetchData()
  }, [page])

  return { isLoading, isError, error, results, hasNextPage }
}
