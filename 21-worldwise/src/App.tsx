import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import Product from './pages/Product.tsx'
import Pricing from './pages/Pricing.tsx'
import Homepage from './pages/Homepage.tsx'
import AppLayout from './pages/AppLayout.tsx'
import PageNotFound from './pages/PageNotFound.tsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
