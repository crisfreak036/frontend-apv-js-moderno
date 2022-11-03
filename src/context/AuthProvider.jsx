import { useState, useEffect, useRef,createContext } from "react"
import clienteAxios from "../config/axios";

const Authcontext = createContext(); // Hace referencia al contexto del provider (contexto de autorización)

const AuthProvider = ({children}) => {
    // Se define el state que estará disponible localmente
    // En esta sección se pueden definir otros elementos además de estados
    const [ auth, setAuth ] = useState({});

    const debeEjecutarse = useRef(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            const apvToken = localStorage.getItem('apv_token')

            if (!apvToken) return
            
            // Configuración del header de la petición a Axios
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apvToken}`
                }
            }

            try {
                const { data } = await clienteAxios.get('/veterinarios/perfil', config)
                setAuth(data.user)
            } catch (error) {
                console.log(error.response.data.message);
                setAuth({})
            }
        }
    
        if (debeEjecutarse.current) {
          debeEjecutarse.current = false
          autenticarUsuario()
        }
    }, [])

    return(
        // Desde al provider es donde nacen los datos
        <Authcontext.Provider
            value={{
                // Value permite indicar que valores retornará el provider desde los elementos definidos en el bloque anterior
                auth,
                setAuth
            }}
        >
            {children}
        </Authcontext.Provider>
    )
}

export {
    AuthProvider
}

export default Authcontext