import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'

import { MarvelPage, DCPage, SearchPage, HeroPage } from '..'
import { Navbar } from '../../../src/ui'

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className='container'>
            <Routes>

            {/* Ruta para las paginas de heroes */}
            <Route path='/marvel' element={<MarvelPage />} />
            <Route path='/dc' element={<DCPage />} />

            <Route path='/search' element={<SearchPage />} />
            <Route path='/hero/:id' element={<HeroPage />} />
            
            {/* Redireccion de ruta princiapl a marvel */}
            <Route path='/' element={<Navigate to='/marvel' />}  />

            </Routes>
        </div>
    </>
  )
}
