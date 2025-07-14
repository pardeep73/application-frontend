import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ChatLayout from './Layouts/ChatLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Layout for chat routes */}
          <Route path='/message' element={<ChatLayout />}>
            <Route path='/message/:receiver' element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
