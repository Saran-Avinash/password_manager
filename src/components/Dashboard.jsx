import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
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

    async function handleLogOut(){
      await logOut();
    }
   
  return (
   <> 
    <Navbar/>   
   </>
  )
}

export default Dashboard
