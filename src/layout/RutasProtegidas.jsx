import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const RutasProtegidas = () => {
    const { auth, cargando } = useAuth() 
    if (cargando) return <h1>Cargando...</h1>
    return (
        <>
        <main>
            <h1>Este es el Layout de las rutas protegidas</h1>
            {
                // En el caso de que auth contenga el id, entonces muestra la vista, de lo contrario envia al login
                auth?._id ? <Outlet/> : <Navigate to="/"/>
            }
        </main>
        </>

    )
}

export default RutasProtegidas