import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import Passwords from './Passwords'
function Dashboard() {

  const {currentUser,
    setCurrentUser,
    signUp,
    logOut,
    logIn} = useAuth()

    const navigate = useNavigate()
    useEffect(()=>{
        if(currentUser == null){
          
            navigate('/login')
        }
    },[currentUser])
    

   
   
  return (
   <> 
    <Navbar/>   
    <Hero/>
    <Passwords/>
   </>
  )
}

export default Dashboard
