import React, { useState } from 'react'

import { Alerta } from '../components/Alerta'

const Formulario = () => {
    const [nombreMascota, setNombreMascota] = useState('')
    const [nombrePropietario, setNombrePropietario] = useState('')
    const [emailPropietario, setEmailPropietario] = useState('')
    const [fechaIngreso, setFechaIngreso] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [sintomas, setSintomas] = useState('')

    const [alerta, setAlerta] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <p className='text-lg text-center mb-10'>
            Añade tus pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form
            className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
            onSubmit={handleSubmit}
        >
            <div className='mb-5'>
                <label 
                    htmlFor="nombreMascota"
                    className="text-gray-700 uppercase font-bold"
                >
                    Nombre Mascota</label>
                <input 
                    type="text"
                    id="nombreMascota"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombreMascota}
                    onChange={(e) => setNombreMascota(e.target.value)}  
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="nombrePropietario"
                    className="text-gray-700 uppercase font-bold"
                >
                    Nombre Propietario</label>
                <input 
                    type="text"
                    id="nombrePropietario"
                    placeholder="Nombre de Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombrePropietario}
                    onChange={(e) => setNombrePropietario(e.target.value)}   
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="emailPropietario"
                    className="text-gray-700 uppercase font-bold"
                >
                    Email Propietario</label>
                <input 
                    type="email"
                    id="emailPropietario"
                    placeholder="Email Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={emailPropietario}
                    onChange={(e) => setEmailPropietario(e.target.value)}   
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="fechaIngreso"
                    className="text-gray-700 uppercase font-bold"
                >
                    Fecha de Ingreso</label>
                <input 
                    type="date"
                    id="fechaIngreso"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaIngreso}
                    onChange={(e) => setFechaIngreso(e.target.value)}  
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="fechaAlta"
                    className="text-gray-700 uppercase font-bold"
                >
                    Fecha de Alta</label>
                <input 
                    type="date"
                    id="fechaAlta"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaAlta}
                    onChange={(e) => setFechaAlta(e.target.value)}  
                />
            </div>

            <div className='mb-5'>
                <label 
                    htmlFor="sintomas"
                    className="text-gray-700 uppercase font-bold"
                >
                    Síntomas</label>
                <textarea 
                    name="sintomas" 
                    id="sintomas"
                    placeholder="Describe los Síntomas del Paciente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)} 
                />
            </div>

            <input 
                type="submit" 
                value="Agregar Paciente"
                className='bg-indigo-600 w-full py-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-colors rounded-xl'  
            />
        </form>
        </>
    )
}

export default Formulario