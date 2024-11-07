import React from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'

export default function InsertData({isAddPassword, setIsAddPassword}) {


    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState(true);
    const [type, setType] = useState("success")
    const [title, setTitle] = useState("")

    const { currentUser,
        setCurrentUser,
        signUp,
        logOut,
        logIn,
    url,
setUrl} = useAuth()
    function handleIsAddPassword() {
        setIsAddPassword(!isAddPassword)
    }
    function switchPassword(){
        const element = document.getElementById("password")
        if(element.type == "text"){
            element.type = "password"
        }
        else{
            element.type = "text"
        }

    }
    function switchComfirmPassword(){
        const element = document.getElementById("confirmPassword")
        if(element.type == "text"){
            element.type = "password"
        }
        else{
            element.type = "text "
        }
    }
    // function generateHash(string) {
    //     let str = string.toLowerCase()
    //     let hash = new Array(26)
    //     for(let char in str){
    //         hash[char - '0']++
    //     }

    //     return hash.toString();
    //   }
      
    async function saveDataInFireBase(){

        const docRef = doc(db, "users", currentUser, "websites", url);
        await setDoc(docRef, {
            "url" : url
        })
        const collectionRef = collection(db, "users", currentUser.toString(), "websites", url, "accounts") 
        const data = {
            userName : userName,
            password : password,
            
        }
        console.log(data)
        await addDoc(collectionRef, data).then((docRef)=> {
            console.log(`Successfully saved at ${docRef.id}`)
            const alert = document.getElementById("alert")
            alert.classList.toggle('translate-y-0')
            alert.classList.toggle('-translate-y-72')
            setTimeout(()=>{
                alert.classList.toggle('translate-y-0')
                alert.classList.toggle('-translate-y-72')
                
            }, 3000)
            
        }).catch(()=>{
            console.log("Error saving data")
        })
    }
  

  return (
    <>
    {/* <ReactJsAlert
        status={status}
        type={type}
        title={title}
        close={()=> setStatus(false)}
    /> */}
    <div className='absolute flex flex-col border-red-200 w-3/4 h-fit p-6 inset-0 m-auto bg-slate-50 z-50 shadow-2xl rounded-2xl'>
    {status && <div id="alert" className='absolute inset-0 mx-auto w-fit h-fit bg-green-600 -translate-y-72 transition-all ease-in duration-200 p-2 text-lg text-white rounded-xl'>Saved Successfully</div>}
            <button className='ml-auto text-red-600 text-2xl' onClick={handleIsAddPassword}>X</button>
            <h1 className='text-3xl text-center after:content-["🔒"]  border-gray-400 pb-5'>Safeguard your password</h1>

            <div className='flex w-full h-full justify-center gap-4 '>
                <div className='flex flex-col basis-1/3 justify-start   '>
                    
                    <img src="/25497-removebg-preview.png" alt="" />
                
                    <h1 className='text-2xl'>Enter the strong password or Use our suggested generate</h1>
                </div>
                <div className='basis-2/4 flex flex-col content gap-7 items-center'>
                    <p className='text-xl'>Password Details</p>
                    <div className='w-full border-2 p-3 rounded-lg'>
                        <label htmlFor="" className='text-slate-500 text-2xl'>Website URL</label>
                        <input type="text" className='relative w-full focus:outline-none text-2xl bg-slate-50' placeholder='youtube.com' onChange={(e)=>{
                            setUrl(e.target.value)
                        }}/>
                        {/* <button className='absolute '>👁️</button> */}
                    </div>
                    <div className='w-full border-2 p-3 rounded-lg'>
                        <label htmlFor="" className='text-slate-500 text-2xl'>User Name</label>
                        <input type="text" onChange={(e)=>{
                            setUserName(e.target.value)
                        }} className='relative w-full focus:outline-none text-2xl bg-slate-50'/>

                    </div>
                    <div className='w-full relative border-2 p-3 rounded-lg'>
                        <label htmlFor="" className='text-slate-500 text-2xl'>Password</label>
                        <input type="password" id="password" onChange={(e)=>{
                            setPassword(e.target.value)
                        }} className=' w-full focus:outline-none text-2xl bg-slate-50'/>
                        <button className='absolute right-0' onClick={switchPassword}>👁️</button>

                    </div>
                    <div className='w-full relative border-2 p-3 rounded-lg'>
                        <label htmlFor="" className='text-slate-500 text-2xl'>Confirm Password</label>
                        <input type="password" id="confirmPassword" onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                        }} className='relative w-full focus:outline-none text-2xl bg-slate-50'/>
                        <button className='absolute right-0' onClick={switchComfirmPassword}>👁️</button>
                    </div>
                    {/* <div className='w-3/4'>
                        <label htmlFor="">Password</label>
                        <input type="text" className='border-2 w-full'/>
                    </div>
                    <div className='w-3/4'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="text" className='border-2 w-full'/>
                    </div> */}

                    <button className='text-2xl w-1/3 h-12 bg-green-600 hover:rounded-full hover:bg-green-500' onClick={saveDataInFireBase}>Save</button>
                </div>
            </div>
           
    </div>
    </>
  )
}
