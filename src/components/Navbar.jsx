import React, { useState } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    function toggleCollapse(){
        setIsOpen(!isOpen);
    }
  return (
    <div className='flex flex-row w-full font-sans'>
       <span className='text-2xl basis-1/2 p-5'>Hi You</span>
       <div className='flex p-5 gap-x-10 relative justify-end basis-1/2'>
         <span className='text-2xl'>?</span>

         <button 
         onClick={toggleCollapse}
         className='text-2xl w-auto'>Profile</button>

         <div className={`absolute  left-0` }>Hi</div>
       </div>
    </div>
  )
}
