import axios, { all } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../utils/Socket'
import { joinroom } from '../utils/RoomID'
import BaseUrl from '../utils/BaseUrl'
import { Loader } from './Loader'



const Chat = ({ name }) => {
    // sender and receiver
    const { receiver } = useParams()
    const [user, setuser] = useState(null)

    const [allmessages, setallmessages] = useState([])
    const [message, setMessage] = useState({
        message: ''
    })

    const [loading, setLoading] = useState(false)

    // get the sender's id
    useEffect(() => {
        axios.post(`${BaseUrl}/api/user/single`, {}, { withCredentials: true })
            .then((res) => {

                if (res.data.success === true) {
                    setuser(res.data.user)
                    

                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const getdata = (e) => {
        const { value, name } = e.target
        setMessage({ ...message, [name]: value })
    }


    // trigger when the user and receiver id got by the state and create a room for the chatting
    useEffect(() => {
        if (user && receiver) {
            const room = joinroom(receiver, user)
            socket.emit('join_room', room)
        }
    }, [user, receiver])

    const handlemessage = async (e) => {
        try {
            e.preventDefault();
            const result = await axios.post(`${BaseUrl}/api/message/create/${receiver}`, message, { withCredentials: true })

            const roomID = joinroom(receiver, user)
            socket.emit('message', { roomID, message: { message: message.message, receiver: receiver } })

            console.log(result)

            setMessage({ message: '' })


        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // fetch the chat among the users
    useEffect(() => {
        setLoading(true)
        axios.post(`${BaseUrl}/api/message/getall/${receiver}`, {}, { withCredentials: true })
            .then((res) => {

                if (res.data.success === true) {
                    setallmessages(res.data.data)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1500);

                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return ()=>{
            setallmessages([])
        }

    }, [receiver])


    // update all messages with the socket messages
    useEffect(() => {
        socket.on('received', (data) => {
            const array = new Array(data)
            setallmessages(prev => [...prev, ...array])
        })
        
        return () => {
            socket.off('message')
        }
    }, [])

    if (loading) {
            return (
                <>
                    <Loader />
                </>)
        }
   
    return (
        <div className="flex flex-col px-2 md:px-5 flex-1 w-[100%] md:w-[80%] md:ml-[20%] lg:w-[80%] lg:ml-[20%] absolute ">
            {/* header */}

            <div className='p-1 bg-black-800 h-[10vh] flex justify-between place-items-center'>
                <div className='uppercase text-xl px-3'>{
                    name ? (name) : 'user'

                }</div>
                <img className='mx-3 cursor md:hidden' id='nav' src="/assets/navigation.svg" width={30} height={30} alt="" />
            </div>


            {/* Messages */}
            <div className=" p-4 text-start space-y-4 overflow-y-auto h-[80vh] ">

                {(allmessages && allmessages.length > 0) ? (
                    allmessages.map((message, index) => {
                        if (message.receiver == receiver) {
                            return (
                                <div key={index + 1} className="flex justify-end items-start">
                                    <div className="bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-[70%]">
                                        <p>{message.message}</p>
                                    </div>
                                </div>

                            )
                        }
                        else {
                            return (

                                <div key={index + 1} className="flex items-start">
                                    <div className="bg-gray-200 text-gray-900 p-3 rounded-xl rounded-bl-none max-w-[70%]">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                ) : (<div className='h-full flex justify-center place-items-center'>
                    <h1 className='text-xl'>
                        No Messages
                    </h1>
                </div>)

                }
            </div>
            {/* Input box */}
            <form onSubmit={handlemessage} className="flex h-[10vh] items-center p-3  ">
                <input
                    type="text"
                    placeholder="Type your message..."
                    name='message'
                    value={message.message}
                    onChange={getdata}
                    className="flex-1  rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-transparent"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>

    )
}

export default Chat



