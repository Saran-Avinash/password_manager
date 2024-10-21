import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  
  const {currentUser, setCurrentUser, signUp, logOut} = useAuth()
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  //register user with firebase

  //logout user
  // async function handleLogOut(){
  //   await logOut().then((success)=>{
  //     console.log(success);
  //   }).catch((error) => {
  //     console.log(error); 
  //   })
  // }

  console.log(`Current User ${currentUser}`);
  return (
    <div className={styles.container}>
     {/* login container */}
      <div className={styles.loginDetails}>
            <h1 className={styles.dynamicText}>Login</h1>
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
                  handleRegister(username, password)
                }}>Log in     </button>
                <p className={styles.signIn}>New User? <a href='#'>Sign up</a></p>

            </div>
      </div>

      {/* image */}
      <div className={styles.loginImage}>
        Image
      </div>
    </div>
  )
}
