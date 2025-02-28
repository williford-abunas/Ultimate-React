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
}

interface CitiesProviderProps {
  children: ReactNode
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined)

function CitiesProvider({ children }: CitiesProviderProps): JSX.Element {
  const [cities, setCities] = useState<Array<City>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities(): CitiesContextType {
  const context = useContext(CitiesContext)
  if (!context) {
    throw new Error('useCities must be used withint a CitiesProvider')
  }

  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }
