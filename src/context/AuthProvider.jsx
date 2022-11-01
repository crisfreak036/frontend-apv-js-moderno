import { useState, useEffect, createContext } from "react"

const Authcontext = createContext(); // Hace referencia al contexto del provider (contexto de autorización)

const AuthProvider = ({children}) => {
    // Se define el state que estará disponible localmente
    // En esta sección se pueden definir otros elementos además de estados
    const [ auth, setAuth ] = useState({});
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