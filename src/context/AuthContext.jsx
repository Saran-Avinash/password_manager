import React, { Children, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { signOut } from 'firebase/auth'


const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState('')   // handles current user state

    async function signUp(username, password){  // username is email  hangles signup method and returns a promise
        return new Promise(async (resolve, reject) => {
            await createUserWithEmailAndPassword(auth, username, password).then((userCredentials)=>{
                resolve(userCredentials);
            }).catch((error)=> {
                reject(error)
            })
        })
    }

    async function logOut(){
        return new Promise(async (resolve, reject) => {
            signOut(auth).then(() => {
                resolve("user logged out successfully")
            }).catch((error)=>{
                reject("error loggin out the user")
            })
        })
    }

    async function logIn(username, password){
        return new Promise((resolve, reject) => {
            
        })
    }

    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, (user)=>{
            if(user){
                setCurrentUser(user.uid);
            }
            else{
                setCurrentUser(null)
            }
        })
        return unsubscribe
    })

    const value={
        currentUser,
        setCurrentUser,
        signUp,
        logOut
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
 
