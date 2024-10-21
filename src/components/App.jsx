import { useState } from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './SignUp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
