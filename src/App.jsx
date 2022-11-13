import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import RutasProtegidas from './layout/RutasProtegidas'

import Login from './pages/public/Login'
import Registrar from './pages/public/Registrar'
import ConfirmarCuenta from './pages/public/ConfirmarCuenta'
import OlvidePassword from './pages/public/OlvidePassword'
import NuevoPassword from './pages/public/NuevoPassword'

import AdministrarPacientes from './pages/private/AdministrarPacientes'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/> 
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvide-password' element={<OlvidePassword/>}/>
              <Route path='olvide-password/:id' element={<NuevoPassword/>}/>
              <Route path='confirmar-cuenta/:id' element={<ConfirmarCuenta/>}/>
            </Route>
          </Routes>

          <Routes>
            <Route path='/admin' element={<RutasProtegidas/>}>
              <Route index element={<AdministrarPacientes/>}/>
            </Route>
          </Routes>
          </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
