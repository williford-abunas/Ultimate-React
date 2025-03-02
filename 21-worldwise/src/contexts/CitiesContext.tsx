import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
  useContext,
} from 'react'
import { City } from '../types/types'

const BASE_URL = 'http://localhost:8000'

interface CitiesContextType {
  cities: Array<City>
  isLoading: boolean
  getCity: (id: number) => void
  currentCity: City | null
}

interface CitiesProviderProps {
  children: ReactNode
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined)

function CitiesProvider({ children }: CitiesProviderProps): JSX.Element {
  const [cities, setCities] = useState<Array<City>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentCity, setCurrentCity] = useState<City | null>(null)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert('Error loading data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  async function getCity(id: string | number) {
    if (!id) return
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch {
      alert('Error loading data...')
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(newCity: City) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {"Content-Type": "application/json"}
      })
      const data = await res.json()
      setCities(cities => [...cities, newCity])
    } catch {
      alert('Error loading data...')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities(): CitiesContextType {
  const context = useContext(CitiesContext)
  if (!context) {
    throw new Error('useCities must be used within a CitiesProvider')
  }

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }
