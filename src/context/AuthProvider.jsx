import { useState, useEffect, useRef,createContext } from "react"
import clienteAxios from "../config/axios";

const Authcontext = createContext(); // Hace referencia al contexto del provider (contexto de autorización)

const AuthProvider = ({children}) => {
    // Se define el state que estará disponible localmente
    // En esta sección se pueden definir otros elementos además de estados
    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true) // Define un estado de carga para la autenticación
    const [ alertaAuthProvider, setAlertaAuthProvider ] = useState({})

    const debeEjecutarse = useRef(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            const apvToken = localStorage.getItem('apv_token')

            if (!apvToken) return setCargando(false)
            
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

            setCargando(false)
        }
    
        if (debeEjecutarse.current) {
          debeEjecutarse.current = false
          autenticarUsuario()
        }
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token')
        setAuth({})
    }

    const actualizarPerfil = async (perfil) => {
        if (auth === perfil) return
        const { _id: id, __v,...perfilActualizado } = perfil
        
        const apvToken = localStorage.getItem('apv_token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`
            }
        }

        try {
            const { data } = await clienteAxios.patch(`/veterinarios/perfil/${id}`, perfilActualizado, config)
            const { error, data: usuarioActualizado } = data

            setAlertaAuthProvider({
                msg: 'Perfil Actualizado Correctamente',
                error: false
            })

            if (!error) setAuth(usuarioActualizado)

        } catch (error) {
            console.error(error.response.data.message)
            setAlertaAuthProvider({
                msg: error.response.data.message,
                error: true
            })
        }

    }

    return(
        // Desde al provider es donde nacen los datos
        <Authcontext.Provider
            value={{
                // Value permite indicar que valores retornará el provider desde los elementos definidos en el bloque anterior
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                alertaAuthProvider
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