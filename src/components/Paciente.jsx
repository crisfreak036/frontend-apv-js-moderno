import React from 'react'

const Paciente = ({paciente}) => {
    const { _id, nombre, propietario, email, fechaDeIngreso, fechaDeAlta, sintomas } = paciente

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es', {dateStyle: 'short'}).format(nuevaFecha)
    }

    return (
        <div className='mx-5 my-10 shadow-md px-5 py-10 rounded-xl'>
            <p className='font-bold uppercase text-indigo-700 my-2'>Nombre: {''}
                <span className='font-normal normal-case text-black'>{nombre}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700 my-2'>Propietario: {''}
                <span className='font-normal normal-case text-black'>{propietario}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700 my-2'>Correo: {''}
                <span className='font-normal normal-case text-black'>{email}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700 my-2'>Fecha de Ingreso: {''}
                <span className='font-normal normal-case text-black'>{formatearFecha(fechaDeIngreso)}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700 my-2'>Fecha de Alta: {''}
                <span className='font-normal normal-case text-black'>{formatearFecha(fechaDeAlta)}</span>
            </p>
            <p className='font-bold uppercase text-indigo-700 my-2'>Sintomas: {''}
                <span className='font-normal normal-case text-black'>{sintomas}</span>
            </p>

            <div className='flex justify-between my-5'>
                <button
                    type='button'
                    className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg'
                >
                    Editar
                </button>
                <button
                    type='button'
                    className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg'
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente