import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CitiesProvider } from './contexts/CitiesContext.tsx'
import Product from './pages/Product.tsx'
import Pricing from './pages/Pricing.tsx'
import Homepage from './pages/Homepage.tsx'
import AppLayout from './pages/AppLayout.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import Login from './pages/Login.tsx'
import CityList from './components/CityList.tsx'
import CountriesList from './components/CountriesList.tsx'
import City from './components/City.tsx'
import Form from './components/Form.tsx'

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountriesList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

export default App
