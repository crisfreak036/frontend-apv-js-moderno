import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'

import { Alerta } from '../components/Alerta'

function Registrar() {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if ([nombre, email, password, repetirPassword].includes('')) return setAlerta({msg: 'Existen campos vacios', error: true})
    if (password !== repetirPassword) return setAlerta({msg: 'Los Password No Coinciden', error: true})
    if (password.length < 6) return setAlerta({msg: 'El Password debe tener al menos 6 caracteres', error: true})

    setAlerta({})

    // Creal el usuario en la API
    try {
      const respuesta = await clienteAxios.post('/veterinarios/', { nombre, email, password });
      if (respuesta.data.error === false) return setAlerta({msg: 'Usuario Creado Correctamente. Revisa Tu Correo Para Finalizar El Registro', error: false})
    } catch (error) {
      const { message } = error.response.data;
      return setAlerta({msg: message, error: true});
    }
  }

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Crea tu Cuenta y Administra 
          <span className='text-black'> tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {alerta['msg'] && <Alerta
          alerta={alerta}
        />}

        <form
          onSubmit={handleSubmit}
        >

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Nombre
            </label>
            <input 
              type='text'
              placeholder='Tu Nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={ e => setNombre(e.target.value)} 
            />
          </div>

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Email
            </label>
            <input 
              type='email'
              placeholder='Tu Email de Usuario'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={ e => setEmail(e.target.value)}  
            />
          </div>

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Password
            </label>
            <input 
              type='password'
              placeholder='Tu Password de Acceso'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={ e => setPassword(e.target.value)}  
            />
          </div>

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Repetir Password
            </label>
            <input 
              type='password'
              placeholder='Repite Tu Password de Acceso'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={ e => setRepetirPassword(e.target.value)}   
            />
          </div>

          <input 
            type="submit" 
            value="Crear Cuenta"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' 
            />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link 
            to="/"
            className='block text-center my-5 text-gray-500 hover:text-gray-900'
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link 
            to="/olvide-password"
            className='block text-center my-5 text-gray-500 hover:text-gray-900'
          >
          Olvide mi Password
          </Link>
        </nav>

      </div>
    </>
  )
}

export default Registrar