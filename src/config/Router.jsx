import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Dashboard from '../Pages/Dashboard'
import ClinicExpences from '../Pages/ClinicExpences'

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/clinic-expences' element={<ClinicExpences />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}