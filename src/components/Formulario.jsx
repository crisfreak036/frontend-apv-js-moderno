import React, { useState, useEffect } from 'react'

import { Alerta } from '../components/Alerta'
import usePacientes from '../hooks/usePacientes'
import useAuth from '../hooks/useAuth'

const Formulario = () => {
    const [nombreMascota, setNombreMascota] = useState('')
    const [nombrePropietario, setNombrePropietario] = useState('')
    const [emailPropietario, setEmailPropietario] = useState('')
    const [fechaIngreso, setFechaIngreso] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, actualizarPaciente, paciente, alertasPacientesProvider } = usePacientes()

    useEffect(() => {
        const { nombre, propietario, email, fechaDeIngreso, fechaDeAlta, sintomas, _id } = paciente
        setNombreMascota(`${ nombre ? nombre : ''}`)
        setNombrePropietario(`${ propietario ? propietario : ''}`)
        setEmailPropietario(`${ email ? email : ''}`)
        setFechaIngreso(`${ fechaDeIngreso ? fechaDeIngreso : ''}`)
        setFechaAlta(`${ fechaDeAlta ? fechaDeAlta : ''}`)
        setSintomas(`${ sintomas ? sintomas : ''}`)
        setId(_id)
    }, [paciente])

    // Muestra las alertas provenientes desde Pacientes Provider
    useEffect(() => {
        setAlerta(alertasPacientesProvider)
    }, [alertasPacientesProvider])

    // Quita la Alerta de la vista
    useEffect(() => {
        setTimeout(() => {
            setAlerta({})
        }, 8000);
    }, [alerta])
    
    // Limpia los inputs
    const limpiarInputs = () => {
        setNombreMascota('')
        setNombrePropietario('')
        setEmailPropietario('')
        setFechaIngreso('')
        setFechaAlta('')
        setSintomas('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validación del Formulario
        if ([nombreMascota, nombrePropietario, emailPropietario, fechaIngreso, fechaAlta, sintomas].includes('')) {
            return setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
        }

        setAlerta({})

        if (id) {

            let data = {};
            if (nombreMascota) data.nombre = nombreMascota;
            if (nombrePropietario) data.propietario = nombrePropietario;
            if (emailPropietario) data.email = emailPropietario;
            if (fechaIngreso) data.fechaDeIngreso = fechaIngreso;
            if (fechaAlta) data.fechaDeAlta = fechaAlta;
            if (sintomas) data.sintomas = sintomas;
            
            // Actualiza la información del paciente
            actualizarPaciente(id, data)
            
            limpiarInputs()
            setId(null)

            return setAlerta({
                msg: 'Información de Paciente Actualizada',
                error: false
            })
        }

        // Agregar paciente
        guardarPaciente({
            nombre: nombreMascota,
            propietario: nombrePropietario,
            email: emailPropietario,
            fechaDeIngreso: fechaIngreso,
            fechaDeAlta: fechaAlta,
            sintomas: sintomas
        })

        limpiarInputs()

        return setAlerta({
            msg: 'Paciente Agregado Exitosamente',
            error: false
        })
    }

    return (
        <>
        <h2 className='font-black text-3xl text-center'>
            Administrador de Pacientes
        </h2>
        <p className='text-xl mt-5 mb-10 text-center'>
            Añade tus pacientes {''}
            <span className='text-indigo-600 font-bold'>y Administralos</span>
        </p>

        {
            alerta['msg'] ? (
                <Alerta
                    alerta={alerta}
                /> 
                ) : null
        }

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
                value={ id ? 'Actualizar Paciente' : 'Agregar Paciente' }
                className='bg-indigo-600 w-full py-3 text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-700 transition-colors rounded-xl'  
            />
        </form>
        </>
    )
}

export default Formulario