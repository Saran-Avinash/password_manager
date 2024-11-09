import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const {currentUser,
      setCurrentUser,
      signUp,
      logOut,
      logIn ,
      url,
      setUrl,
      setWebsites,
      websites,
      fetchData,
    accounts,
  setAccounts} = useAuth()
    function toggleCollapse(){
        setIsOpen(!isOpen);
    }

    function collapsibleContent(){
      const container = document.getElementById("collapsibleContent")
      container.classList.toggle('max-h-0')
      container.classList.toggle('p-3')
      container.classList.toggle('max-h-96')
    }

    async function handleLogOut(){
      setWebsites([]);
      setAccounts({});
      await logOut().then((result)=>{
        console.log(result)
      }).catch((error)=>{
        console.log(error)
      })
    }
  return (
    <div className='flex flex-row w-full font-sans bg-gray-100 justify-end'>
       <div className='flex p-5 gap-x-10 relative justify-end basis-1/2'>
         <span className='text-xl '><button className='hover:bg-gray-200' onClick={()=>{
          navigate(`/dashboard/user/${currentUser}`)
         }}>Dashboard</button></span>
         <span className='text-xl '><button className='hover:bg-gray-200' onClick={()=>{ 
          navigate(`/dashboard/user/${currentUser}/password_generator`)}}>Generate Password</button></span>

         <button 
          onClick={collapsibleContent}
         className='text-2xl hover:bg-gray-200  '>
            <img src="/person_13924070.png" className='w-6 h-6 ' alt="" />

         </button>

         <div id="collapsibleContent"  className={`absolute  flex flex-col justify-start gap-3 items-start rounded-lg shadow-lg w-1/2 h-64 top-14  bg-white overflow-hidden max-h-0 transition-all duration-75 ease-out z-50`}>
            <div className='w-14 h-14 flex justify-center  items-center rounded-full bg-gray-200'>
            </div>
            {/* <div className='w-full  hover:bg-gray-200  h-auto border-b-2 px-2 py-2 transition-all ease-in-out duration-500'>
               <button className='text-lg'>My profile</button>
            </div> */}
            <div className='w-full  hover:bg-gray-200  h-auto border-b-2 px-2 py-2 transition-all ease-in-out duration-500'>
               <button className='text-lg hover:bg-gray-200' onClick={handleLogOut}>Logout</button>
            </div>
            <div className='w-full  hover:bg-gray-200  h-auto px-2 py-2 transition-all ease-in-out duration-500'>
               <button className='text-lg hover:bg-gray-200' onClick={handleLogOut}>Help</button>
            </div>
            
            
         </div>
       </div>
    </div>
  )
}
