import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { HeroesRoutes } from '../heroes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { LoginPages } from '../auth'

export const AppRouter = () => {
  return (
    <>
        <Routes>

          {/* Rutas publicas */}
          <Route path='/login' element={
            <PublicRoute>
              <LoginPages />
            </PublicRoute>
          }
          />

          {/* Rutas privadas */}
          <Route path='/*' element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
          />

        </Routes>
    </>
  )
}
