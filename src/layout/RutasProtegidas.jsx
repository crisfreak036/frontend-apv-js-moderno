import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import Header from '../components/Header'
import Footer from '../components/Footer'

const RutasProtegidas = () => {
    const { auth, cargando } = useAuth() 
    if (cargando) return <h1>Cargando...</h1>
    return (
        <>
        <Header/>
        {
            // En el caso de que auth contenga el id, entonces muestra la vista, de lo contrario envia al login
            auth?._id ? (
                <main className='container mx-auto mt-10'>
                    <Outlet/>
                </main>
                ) : <Navigate to="/"/>
        }
        <Footer/>
        </>

    )
}

export default RutasProtegidas