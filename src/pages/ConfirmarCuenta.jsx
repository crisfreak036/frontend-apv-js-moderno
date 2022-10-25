import clienteAxios from '../config/axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alerta } from '../components/Alerta'


const ConfirmarCuenta = () => {
  const debeEjecutarse = useRef(true) // Inicialización de la referencia de ejecución en useEffect

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmacionCeunta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`
        const { data } = await clienteAxios.get(url)
        setCuentaConfirmada(true)
        setAlerta({msg: data.message, error: false})

        console.log(data);
      } catch (error) {
        setAlerta({msg: error.response.data.message, error: true})
      }

      setCargando(false)
    }

    /*
    En react 18, useEffect se ejecuta 2 veces cuando se utiliza strictmode por lo cual 
    se recomienda mantener una referencia que le diga a react si ejecutar o no la función del useEffect
    */
    if (debeEjecutarse.current) {
      debeEjecutarse.current = false // Se cambia el valor a false
      confirmacionCeunta()
    }
  }, [])

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirma tu Cuenta y Comienza a Administrar 
          <span className='text-black'> tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          cargando && (
            <h1>CARGANDO...</h1>
          )
        }
        {
          !cargando && <Alerta
          alerta={alerta}
        />
        }
        {
          cuentaConfirmada && (
            <Link 
                to="/"
                className='block text-center my-5 text-gray-500 hover:text-gray-900'
              >
                Inicia Sesión Ingresando Aquí
            </Link>
          )
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta