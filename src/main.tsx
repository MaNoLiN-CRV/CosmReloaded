import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DevProfile from './components/profile/DevProfile.tsx'
import WhatWeDo from './components/pages/WhatWeDo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dev/:username" element={<DevProfile />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
