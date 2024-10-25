import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

export default function Passwords() {

    const [websiteData, setWebsiteData] = useState([])
    const [allData, setAllData] = useState([])
    const {   currentUser,
        setCurrentUser,
        signUp,
        logOut,
        logIn,
        url,
        setUrl} = useAuth()
        console.log(websiteData)
        
    //     const passwordData = {}
    //     async function getAccountsData(){
    //         for(const website of websiteData){
    //             const collectionRef = collection(db, "users", currentUser, "websites", website, "accounts")
    //             const querySnapShot = await getDocs(collectionRef)
    
    //            querySnapShot.forEach((doc)=>{
    //             // console.log(doc.id, "=>", doc.data())
    //              passwordData[doc.data()["websiteUrl"]] = {
    //                 data : {
    //                     userName : doc.data()["userName"],
    //                     password : doc.data
    //                 }

    //              }   
    //            })
    //         }
    //     }
    //     async function fetchData(){
    //     const data = []
    //     const collectionRef = collection(db, "users", currentUser, "websites")
    //     const querySnapShot = await getDocs(collectionRef)
        
    //     querySnapShot.forEach((doc)=>{
    //         data.push(doc.id)
    //     })

    //     setWebsiteData([...new Set([...data])])
    //     // getAccountsData()
    // }
        // useEffect(()=> {

        //  const fetchData = async ()  => {
        //     console.log(currentUser)

        //      const docRef = doc(db, "users", currentUser)
        //      try{
        //          const docSnap = await getDoc(docRef)
 
        //      if(docSnap.exists()){
        //          console.log(docSnap.data())
        //      }else{
        //          console.log("No document available")
        //      }
        //     }
        //     catch(error){
        //         console.log(error)
        //     }
        //  }   
        //  fetchData()
        // },[])
   

  return (
    <>
        <div className='flex flex-col max-w-custom mx-auto border-2 gap-7 rounded-2xl px-10 py-6'>
           <div className='flex w-full  justify-between border-b-2 pb-6'>
             <h1 className=' text-2xl '>83 Passwords</h1>
             <input type="text" name="" id="" value="search" />
           </div>
           <div>
                {/* <button onClick={fetchData}> Get Data</button> */}
           </div>
        </div> 
    </>
  )
}
