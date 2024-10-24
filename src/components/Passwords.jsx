import React, { useEffect } from 'react'
import { db } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

export default function Passwords() {

    const {   currentUser,
        setCurrentUser,
        signUp,
        logOut,
        logIn} = useAuth()

        useEffect(()=> {

         const fetchData = async ()  => {

             const docRef = doc(db, "users", "AK0t8ADETAT15UMwjC1gj0oaOUv1")
             try{
                 const docSnap = await getDoc(docRef)
 
             if(docSnap.exists()){
                 console.log(docSnap.data())
             }else{
                 console.log("No document available")
             }
            }
            catch(error){
                console.log(error)
            }
         }   
         fetchData()
        },[])
   

  return (
    <>
        <div className='flex flex-col max-w-custom mx-auto border-2 gap-7 rounded-2xl px-10 py-6'>
           <div className='flex w-full  justify-between border-b-2 pb-6'>
             <h1 className=' text-2xl '>83 Passwords</h1>
             <input type="text" name="" id="" value="search" />
           </div>
           <div>
                list
           </div>
        </div> 
    </>
  )
}
