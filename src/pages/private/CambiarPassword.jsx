import React, { useState, useEffect } from 'react'

import useAuth from '../../hooks/useAuth'


import AdminNav from '../../components/AdminNav'
import { Alerta } from '../../components/Alerta'

const CambiarPassword = () => {
    const { alertaAuthProvider, actualizarPassword, auth } = useAuth()

    const [ passwordActual, setPasswordActual ] = useState('')
    const [ nuevaPassword, setNuevaPassword ] = useState('')
    const [ confirmarNuevaPassword, setConfirmarNuevaPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    useEffect(() => {
        setAlerta(alertaAuthProvider)
    }, [alertaAuthProvider])

    useEffect(() => {
        setTimeout(() => {
            setAlerta({})
        }, 5000);

    }, [alerta])

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([passwordActual, nuevaPassword, confirmarNuevaPassword].includes('')) return setAlerta({msg: 'Todos los Campos son Obligatorios', error: true}) 
        if (nuevaPassword !== confirmarNuevaPassword) return setAlerta({msg: 'Los Password No Coinciden', error: true})
        if (nuevaPassword.length < 6) return setAlerta({msg: 'El Password debe tener al menos 6 caracteres', error: true})
        if (passwordActual === nuevaPassword) return setAlerta({msg: 'No estás ingresando una nueva password', error: true})

        actualizarPassword({
            id: auth._id,
            password: passwordActual,
            nuevaPassword
        })

        setPasswordActual('')
        setNuevaPassword('')
        setConfirmarNuevaPassword('')
    }

    return (
        <>
            <AdminNav/>
            <h2 
                className='font-black text-3xl text-center mt-10'
            >
                Cambiar Password
            </h2>
            <p
                className='text-xl mt-5 mb-10 text-center'
            >
                Modifica tu {''} 
                <span className='text-indigo-600 font-bold'>Password Aquí</span>
            </p>

            <div className='flex justify-center'>
                    <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                    {
                        alerta?.msg ? (<Alerta
                        alerta={alerta} 
                        />) : null
                    }
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className='my-3'>
                                <label 
                                    htmlFor="password-actual"
                                    className="text-gray-600 uppercase font-bold"
                                >
                                    Password Actual</label>
                                <input 
                                    type="password"
                                    id="password-actual"
                                    name="password-actual"
                                    placeholder="Password Actual"
                                    className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                    value={passwordActual}
                                    onChange={(e) => setPasswordActual(e.target.value)}  
                                />
                            </div>

                            <div className='my-3'>
                                <label 
                                    htmlFor="nueva-password"
                                    className="text-gray-600 uppercase font-bold"
                                >
                                    Nueva Password</label>
                                <input 
                                    type="password"
                                    id="nueva-password"
                                    name="nueva-password"
                                    placeholder="Nueva Password"
                                    className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                    value={nuevaPassword}
                                    onChange={(e) => setNuevaPassword(e.target.value)}  
                                />
                            </div>

                            <div className='my-3'>
                                <label 
                                    htmlFor="confirmar-nueva-password"
                                    className="text-gray-600 uppercase font-bold"
                                >
                                    Confirmar Nueva Password</label>
                                <input 
                                    type="password"
                                    id="confirmar-nueva-password"
                                    name="confirmar-nueva-password"
                                    placeholder="Confirmar Nueva Password"
                                    className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                    value={confirmarNuevaPassword}
                                    onChange={(e) => setConfirmarNuevaPassword(e.target.value)}  
                                />
                            </div>

                            <input 
                                type="submit" 
                                value='Actualizar Password'
                                className='bg-indigo-600 w-full mt-3 py-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-colors rounded-xl'  
                            />
                        </form>
                    </div>
                </div>
        </>
    )
}

export default CambiarPassword