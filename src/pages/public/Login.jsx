import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alerta } from '../../components/Alerta'
import clienteAxios from '../../config/axios'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})
  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].includes('')) return setAlerta({msg: 'Todos los Campos Son Obligatorios', error: true})

    const verificacionEmail = email === undefined || email.length < 10
    const verificacionPassword = password === undefined || password.length < 6

    if (verificacionEmail || verificacionPassword) return setAlerta({msg: 'Email o Password incorrectos', error: true})
    setAlerta({})

    try {
      const { data } =  await clienteAxios.post('/veterinarios/login', { email, password })
      const { data: { jwt } } = data
      localStorage.setItem('apv_token', jwt) // Se almacena el token en localStorage
      setAuth({login: true})
      
      setEmail('')
      setPassword('')

      navigate('/admin') // Redirige el login hacía la vista de admin
    } catch (error) {
      const { message } = error.response.data;
      return setAlerta({msg: message, error: true})
    }
  }
  
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Inicia Sesión y Administra tus 
          <span className='text-black'> Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          alerta['msg'] ? (<Alerta
          alerta={alerta} 
          />) : null
        }

        <form
        onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Email
            </label>
            <input 
              type='email'
              placeholder='Email de Registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)} 
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
              placeholder='Tu Contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}  
            />
          </div>
          <input 
            type="submit" 
            value="Iniciar Sesión"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' 
            />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link 
            to="/registrar"
            className='block text-center my-5 text-gray-500 hover:text-gray-900'
          >
            ¿No tienes una cuenta? Registrate
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

export default Login