import React from 'react'
import { Outlet } from 'react-router-dom'

function RutasProtegidas() {
  return (
    <>
      <main>
        <h1>Este es el Layout de las rutas protegidas</h1>
        <Outlet/>
      </main>
    </>

  )
}

export default RutasProtegidas