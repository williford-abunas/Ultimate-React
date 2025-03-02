import {
  createContext,
  useState,
  useEffect,
  useReducer,
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

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action) {
  switch(action.type) {
    case 'loading':
      return {...state, isLoading: true}
    case 'cities/loaded':
      return {
        ...state, isLoading: false, cities: action.payload
      };
    case 'city/loaded':
      return {
        ...state, isLoading: false, currentCity: action.payload
      }
    case 'city/created':
      return {
        ...state, isLoading: false, cities: [...state.cities, action.payload]
      }
    case 'city/deleted':
      return {
        ...state, isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload)
      }
    case 'rejected':
      return {...state, isLoading: false, error: action.payload}
    default:
      throw new Error("Unknown action type")
  }
}

function CitiesProvider({ children }: CitiesProviderProps): JSX.Element {
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)
  // const [cities, setCities] = useState<Array<City>>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [currentCity, setCurrentCity] = useState<City | null>(null)

  useEffect(() => {
    async function fetchCities() {
      dispatch({type: "loading"})
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({type: 'cities/loaded', payload: data})
      } catch {
        dispatch({type: 'rejected', payload: 'Error loading cities...'})
      }
    }
    fetchCities()
  }, [])

  async function getCity(id: string | number) {
    if (!id) return
    dispatch({type: "loading"})

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({type: 'city/loaded', payload: data})
    } catch {
      dispatch({type: 'rejected', payload: 'Error loading city...'})

    } 
  }

  async function createCity(newCity: City) {
    dispatch({type: "loading"})

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {"Content-Type": "application/json"}
      })
      const data = await res.json()
      dispatch({type: 'city/created', payload: data})
    } catch {
      dispatch({type: 'rejected', payload: 'Error creating the city...'})

    } 
  }

  async function deleteCity(id) {
    dispatch({type: "loading"})

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })
      dispatch({type: 'city/deleted', payload: id})
    } catch {
      dispatch({type: 'rejected', payload: 'Error deleting the city...'})
    } 
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
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
