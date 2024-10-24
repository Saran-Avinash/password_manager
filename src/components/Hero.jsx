import React from 'react'

export default function Hero() {
  return (
    <>
    <div className='flex flex-col max-w-custom mx-auto  items-start h-1/3 bg-white py-6 gap-5 '>
        
        <h1 className='text-2xl fixed left-100  box-border'>Password Manager</h1>
        
        <div>
            <p className='text-zinc-400 mt-11'>See, save and edit your passwords</p>
        </div>

        <div className='flex justify-evenly rounded-2xl items-center w-full h-48 border-2 content-center'>
            <div className='flex flex-col w-full h-full justify-evenly basis-1/2'>
                <h1 className='text-2xl'>Add Password</h1>
                <p>Click here to Save Passwords</p>
            <button className="w-3/4 relative h-auto p-3 rounded-full border-2 before:content-['+'] before:absolute before:left-2 text-xl hover:shadow-lg">Add New Password</button>
            </div>
            <div>
                <img src="/icons8-show-password-96.png" alt="" />
            </div>
        </div>
    </div>
    </>
  )
}
