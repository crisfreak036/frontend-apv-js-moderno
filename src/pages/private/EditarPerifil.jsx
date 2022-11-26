import React from 'react'
import AdminNav from '../../components/AdminNav'


const EditarPerifil = () => {
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
    </>
  )
}

export default EditarPerifil