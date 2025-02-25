import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product.tsx'
import Pricing from './pages/Pricing.tsx'
import Homepage from './pages/Homepage.tsx'
import AppLayout from './pages/AppLayout.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import Login from './pages/Login.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>INDEX</p>} />
          <Route path="cities" element={<p>List of cities</p>} />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
