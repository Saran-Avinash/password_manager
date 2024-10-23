import React, { useContext } from 'react'
import styles from '../styles/signup.module.css'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
export default function Signup() {

 const[password, setPassword] = useState();
 const[userName, setUserName] = useState();
 const {currentUser, setCurrentUser, signUp, logOut, logIn} = useAuth()
 async function handleRegister (username, password){
    await signUp(username, password).then((userCredentials) => JSON.stringify(userCredentials)).catch((error)=>{
    console.log(error);
  })
  }
  console.log(`Current user ${currentUser}`)
  return (
    <div>
      <div className={styles.container}>
     {/* login container */}
      <div className={styles.signupDetails}>
            <h1 className={styles.dynamicText}>Sign up</h1>
            <h2>Your One stop destination for Password Management</h2>
            <div className={styles.formContainer}>
                <label htmlFor="">User Name</label>
                <input type="text" placeholder='enter you name' onChange={(e)=>{
                  setUserName(e.target.value)
                }}/>
                <label htmlFor="">Password</label>
                <input type="password" onChange={(e)=>{
                  console.log(e.target.value)
                  setPassword(e.target.value)
                }}/>

                <button onClick={()=>{
                  handleRegister(userName, password)
                }}>Sign up    </button>
                <p className={styles.signIn}>Already have an account?<Link to='/login' >Log in</Link></p>

            </div>
      </div>

      {/* image */}
      <div className={styles.loginImage}>
        Image
      </div>
    </div>
   </div>
  )
}
