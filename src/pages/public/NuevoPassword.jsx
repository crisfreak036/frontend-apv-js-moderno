import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'

import { Alerta } from '../../components/Alerta'

function NuevoPassword() {
  const params = useParams()
  const { id } = params

  const debeEjecutarse = useRef(true)

  const [ tokenConfirmado, setTokenConfirmado ] = useState(false)
  const [ passwordCambiada, setPasswordCambiada ] = useState(false)
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/veterinarios/olvide-password/${id}`
        const { data } = await clienteAxios.get(url)
        const { error, code } = data;
        if (!error && code === 200 ) return setTokenConfirmado(true);
      } catch (error) {
        setAlerta({msg: 'Hubo un error con el enlace', error: true})
      }
    }

    if (debeEjecutarse.current) {
      debeEjecutarse.current = false
      comprobarToken()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if ([password, repetirPassword].includes('')) return setAlerta({msg: 'Existen campos vacios', error: true})
    if (password !== repetirPassword) return setAlerta({msg: 'Los Password No Coinciden', error: true})
    if (password.length < 6) return setAlerta({msg: 'El Password debe tener al menos 6 caracteres', error: true})

    setAlerta({})

    try {
      const { data } = await clienteAxios.post(`veterinarios/olvide-password/${id}`, { password });
      const { error, code } = data;
      if (!error && code === 200 ) {
        setPassword('')
        setRepetirPassword('')
        setPasswordCambiada(true)
        return setAlerta({msg: 'Password Modificada correctamente', error: false})
      }
    } catch (error) {
      const { message } = error.response.data;
      return setAlerta({msg: message, error: true});
    }
  }

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Reestablece tu password y no Pierdas Acceso a 
          <span className='text-black'> tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {alerta['msg'] && <Alerta
          alerta={alerta}
        />}

        {tokenConfirmado && !passwordCambiada ? (<form
          onSubmit={handleSubmit}
        >

          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Nuevo Password
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
              Repetir Nuevo Password
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
            value="Guardar Nuevo Password"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto' 
            />
        </form>) : null}
        
        {
          tokenConfirmado ? (
            <Link 
                to="/"
                className='block my-5 text-gray-500 hover:text-gray-900'
              >
                Inicia Sesión Ingresando Aquí
            </Link>
          ) : (
            <Link 
            to="/olvide-password"
            className='block my-5 text-gray-500 hover:text-gray-900'
            >
            Olvide mi Password
            </Link>
          )
        }
      </div>
    </>
  )
}

export default NuevoPassword