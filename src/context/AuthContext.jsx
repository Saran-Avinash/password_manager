import React, { Children, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import {auth, db} from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import {useNavigate   } from 'react-router-dom'


const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState('')   // handles current user state

    async function signUp(username, password){  // username is email  hangles signup method and returns a promise
        return new Promise(async (resolve, reject) => {
            await createUserWithEmailAndPassword(auth, username, password).then(async (userCredentials)=>{


                const userRef = doc(db, "users", userCredentials.user.uid)

                await setDoc(userRef, {
                    user: userCredentials.user.email,
                    userId: userCredentials.user.uid
                }).then((result)=>{
                    console.log(result);
                }).catch((error)=>{
                    console.log(error);
                })



                resolve(userCredentials);
            }).catch((error)=> {
                reject(error)
            })
        })
    }

    async function logOut(){
        return new Promise(async (resolve, reject) => {
            await signOut(auth).then(() => {
                resolve("user logged out successfully")
            }).catch((error)=>{
                reject("error login out the user")
            })
        })
    }

    async function logIn(username, password){
        return new Promise(async (resolve, reject) => {
            await signInWithEmailAndPassword(auth, username, password).then((userCredentials) => {
                resolve("user successfully logged in");
            }).catch((error)=>{
                reject(error)
            })
        })
    }

    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, (user)=>{
            if(user){
                setCurrentUser(user.uid); 
                navigate(`dashboard/user/${user.uid}`)
            }
            else{
                setCurrentUser(null)
                console.log(`Current user state from onAuthStateChanged: ${currentUser}`)
            }
        })
        return unsubscribe
    },[])

    const value={
        currentUser,
        setCurrentUser,
        signUp,
        logOut,
        logIn
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
 
