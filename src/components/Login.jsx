import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Signup from './SignUp'
export default function Login() {
  
  const {currentUser, setCurrentUser, signUp, logOut, logIn} = useAuth()
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  //register user with firebase

  // login the user
  async function handleLogin(username, password){
    await logIn(username, password).then((result)=>{
      console.log(result)
    }).catch((error)=> {
      console.log(error)
    })  
  }

  async function handleLogOut(){
    await logOut().then((result)=>{
      console.log(result)
    }).catch((error)=>{
      console.log(error);
    })
  }

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
                  handleLogin(username, password)
                }}>Log in     </button>
                <p className={styles.signIn}>New User? <Link to='/signup'>Sign up</Link></p>
                <button onClick={handleLogOut}>Log Out</button>

            </div>
      </div>

      {/* image */}
      <div className={styles.loginImage}>
        <img src="/rb_16052.png" alt="" />
      </div>
    </div>
  )
}
