import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Product from './pages/Product.tsx'
import Pricing from './pages/Pricing.tsx'
import Homepage from './pages/Homepage.tsx'
import AppLayout from './pages/AppLayout.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import Login from './pages/Login.tsx'
import CityList from './components/CityList.tsx'
import CountriesList from './components/CountriesList.tsx'
import City from './components/City.tsx'
import Form from "./components/Form.tsx"

const BASE_URL = 'http://localhost:8000'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
      setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
       setCities(data)}
      catch {
        alert('Error loading data...')
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
