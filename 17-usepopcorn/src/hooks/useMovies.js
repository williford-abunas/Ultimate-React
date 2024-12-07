import { useState, useEffect } from "react"

const apiKey = process.env.REACT_APP_API_KEY

export const useMovies = (query) => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // callback?.()
    const controller = new AbortController()
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, { signal: controller.signal })
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found!')
        setMovies(data.Search)
        setError("")
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
          console.error(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError("")
      return
    }

    fetchMovies()

    return () => { controller.abort() }
  }, [query])

  return { movies, isLoading, error }
}