import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ChatLayout from './Layouts/ChatLayout'
import Allusers from './pages/Allusers'


function App() {
  const [getprop, setprop] = useState(null)


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Layout for chat routes */}
          <Route path='/message' element={<ChatLayout username={setprop} />}>
            <Route path='/message' element={<Allusers username={setprop}/>}/>
            <Route path='/message/:receiver' element={<Chat name={getprop} />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
