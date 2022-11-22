import { useState, useEffect, useRef,createContext } from "react"
import clienteAxios from "../config/axios";

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {
    const debeEjecutarse = useRef(true)
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

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
            setPacientes([...pacientes, nuevoPaciente])
        } catch (error) {
            console.log(error.response.data.message);
        }
        
    }

    const obtenerPaciente = async (paciente) => {
        setPaciente(paciente)
    }

    useEffect(() => {
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
                setPacientes([...pacientes, ...data.data])
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    
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
                pacientes
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