import React, { useState, useEffect } from 'react'

import AdminNav from '../../components/AdminNav'
import { Alerta } from '../../components/Alerta'

import useAuth from '../../hooks/useAuth'



const EditarPerifil = () => {

    const { auth } = useAuth()

    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = (e) => {
        e.preventDefault()

        const { nombre, email } = perfil

        if ([ nombre, email ].includes('')) return setAlerta({msg: `Email y Nombre Son Obligatorios`, error: true})

        // Actualizar el Perfil
        // actualizarPerfil(perfil)

    }

    useEffect(() => {
        setTimeout(() => {
            setAlerta({})
        }, 10000);
    }, [alerta])

    return (
        <>
            <AdminNav/>
            <h2 
                className='font-black text-3xl text-center mt-10'
            >
                Editar Perfil
            </h2>
            <p
                className='text-xl mt-5 mb-10 text-center'
            >
                Modifica tu {''} 
                <span className='text-indigo-600 font-bold'>Información Aquí</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                {
                    alerta['msg'] ? (<Alerta
                    alerta={alerta} 
                    />) : null
                }
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className='my-3'>
                            <label 
                                htmlFor="nombre"
                                className="text-gray-600 uppercase font-bold"
                            >
                                Nombre</label>
                            <input 
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre"
                                className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                value={perfil.nombre || ''}
                                onChange={(e) => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}  
                            />
                        </div>

                        <div className='my-3'>
                            <label 
                                htmlFor="email"
                                className="text-gray-600 uppercase font-bold"
                            >
                                Email</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                value={perfil.email || ''}
                                onChange={(e) => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}    
                            />
                        </div>

                        <div className='my-3'>
                            <label 
                                htmlFor="telefono"
                                className="text-gray-600 uppercase font-bold"
                            >
                                Teléfono</label>
                            <input 
                                type="text"
                                id="telefono"
                                name="telefono"
                                placeholder="Teléfono de Contacto"
                                className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                value={perfil.telefono || ''}
                                onChange={(e) => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}   
                            />
                        </div>

                        <div className='my-3'>
                            <label 
                                htmlFor="web"
                                className="text-gray-600 uppercase font-bold"
                            >
                                Web</label>
                            <input 
                                type="text"
                                id="web"
                                name="web"
                                placeholder="Web Personal"
                                className="border-2 w-full bg-gray-50 p-2 mt-5 rounded-md"
                                value={perfil.web || ''}
                                onChange={(e) => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}  
                            />
                        </div>

                        <input 
                            type="submit" 
                            value='Actualizar Información'
                            className='bg-indigo-600 w-full mt-3 py-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-colors rounded-xl'  
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerifil