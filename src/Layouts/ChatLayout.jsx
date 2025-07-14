import React from 'react'
import Allusers from '../pages/Allusers'
import { Outlet } from 'react-router-dom'

const ChatLayout = () => {
  return (

    <div className='flex'>
        <Allusers/>
        <Outlet/>
    </div>
  )
}

export default ChatLayout