import { useState } from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './SignUp'
import Dashboard from './Dashboard'
import { AuthProvider } from '../context/AuthContext'
import PasswordGenerator from './PasswordGenerator'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/dashboard/user/:uid' Component={Dashboard}/>
      </Routes>

      </AuthProvider>
      <PasswordGenerator/>
    </BrowserRouter>
  )
}

export default App
