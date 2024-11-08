import React, { useState } from 'react'
import InsertData from './InsertData'


export default function Hero() {

    const [isAddPassword, setIsAddPassword] = useState(false)
    function handleAddPassword(){
        setIsAddPassword(!isAddPassword)
    }

  return (
    <>
    {isAddPassword && <InsertData isAddPassword={isAddPassword} setIsAddPassword={setIsAddPassword}/>}
    <div className='flex flex-col max-w-custom mx-auto  items-start h-1/3 bg-white py-6 gap-5 '>
        
        <h1 className='text-2xl left-100  box-border z-50 bg'>Password Manager</h1>
        
        <div>
            <p className='text-zinc-400 mt-11'>See, save and edit your passwords</p>
        </div>

        <div className='flex justify-evenly rounded-2xl items-center w-full h-48 border-2 content-center'>
            <div className='flex flex-col w-full h-full justify-evenly basis-1/2'>
                <h1 className='text-2xl'>Add Password</h1>
                <p>Click here to Save Passwords</p>
            <button onClick={handleAddPassword} className="w-56 relative h-auto p-3 rounded-md border-2 after:content-['+'] after:absolute after:right-3 text-xl hover:shadow-lg text-white bg-green-500 hover:bg-green-400">Add New Password</button>
            </div>
            <div>
                <img src="/icons8-show-password-96.png" alt="" />
            </div>
        </div>
    </div>
    </>
  )
}
