import React, { useEffect, useState } from 'react'
import Allusers from '../pages/Allusers'
import { Outlet } from 'react-router-dom'



const ChatLayout = ({ username }) => {


  const [prop, setprop] = useState()

  useEffect(() => {
    username(prop)
  }, [prop])


  return (

    <div className='flex h-[100vh] w-[100vw] relative'>
      <Allusers username={setprop} />
      <Outlet />
    </div>
  )
}

export default ChatLayout