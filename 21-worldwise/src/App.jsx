import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useEffect, useState} from 'react'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const BASE_URL = "http://localhost:9000"

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        
        setCities(data)
      } catch (error) {
        console.error(error.message)
        alert('Error loading data...')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
