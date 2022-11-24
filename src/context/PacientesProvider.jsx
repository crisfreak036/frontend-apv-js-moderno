import { useState, useEffect, useRef,createContext } from "react"
import clienteAxios from "../config/axios";

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {
    const debeEjecutarse = useRef(true)
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const [alertasPacientesProvider, setAlertasPacientesProvider] = useState({})

    const guardarPaciente = async (paciente) => {
        const apvToken = localStorage.getItem('apv_token')
        
        // Configuración del header de la petición a Axios
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`
            }
        }
        try {
            const { data } = await clienteAxios.post('/pacientes', paciente, config)
            /* En el destructuring se puede crear un objeto nuevo con la información
               restante utilizando el spread operator
            */
            const { data: { createdAt, updatedAt, __v, ...nuevoPaciente } } = data 
            setPacientes([nuevoPaciente, ...pacientes])
        } catch (error) {
            console.log(error.response.data.message);
        }
        
    }

    const obtenerPaciente = async (paciente) => {
        setPaciente(paciente)
    }

    const actualizarPaciente = async (id, paciente) => {
        const apvToken = localStorage.getItem('apv_token')
        
        // Configuración del header de la petición a Axios
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`
            }
        }
        try {
            const { data } = await clienteAxios.patch(`/pacientes/${id}`, paciente, config)
            /* En el destructuring se puede crear un objeto nuevo con la información
               restante utilizando el spread operator
            */
            const { data: { createdAt, updatedAt, __v, ...pacienteActualizado } } = data

            const pacientesActualizados = pacientes.map((pacienteEnState) => {
                return pacienteEnState._id === pacienteActualizado._id ? pacienteActualizado : pacienteEnState
            })
            setPacientes(pacientesActualizados)

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const obtenerPacientes = async () => {                
        const apvToken = localStorage.getItem('apv_token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`
            }
        }

        try {
            const { data } = await clienteAxios.get('/pacientes', config)
            setPacientes([...data.data])
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const eliminarPaciente = async (id) => {

        const confirmacionEliminacion = confirm('¿Confirmas que deseas eliminar el paciente?')

        if (!confirmacionEliminacion) return

        const apvToken = localStorage.getItem('apv_token')

        // Configuración del header de la petición a Axios
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`
            }
        }
        try {
            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)

            const pacientesActualizados = pacientes.filter((pacienteEnState) => {
                return pacienteEnState._id !== id
            })

            setPacientes(pacientesActualizados)
            setAlertasPacientesProvider({
                msg: 'Paciente Eliminado Correctamente',
                error: false
            })

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        if (debeEjecutarse.current) {
          debeEjecutarse.current = false
          obtenerPacientes()
        }
    }, [])

    return(
        // Desde al provider es donde nacen los datos
        <PacientesContext.Provider
            value={{
                guardarPaciente,
                obtenerPaciente,
                actualizarPaciente,
                eliminarPaciente,
                paciente,
                pacientes,
                alertasPacientesProvider
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacientesContext