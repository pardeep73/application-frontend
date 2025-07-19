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


    //user messages
    const [allmessages, setallmessages] = useState([])
    const [message, setMessage] = useState({
        message: ''
    })

    //chatroom and loaders
    const [room, setRoom] = useState(undefined)
    const [loading, setLoading] = useState(false)

    // typo setup
    const [typing, setTyping] = useState(false)


    const messagesEndRef = useRef(null);


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
            setRoom(room)
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
        return () => {
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


    // typing event emit
    useEffect(() => {
        if (room && message.message != '') {
            socket.emit('typing', { room, typing: true })
        }

        const timeout = setTimeout(() => {
            socket.emit('typing', { room, typing: false })
        }, 800);

        socket.on('typing_message', ({ typing }) => {
            setTyping(typing)
        })

        return () => {
            clearTimeout(timeout)
            socket.off('typing_message')
        }

    }, [room, message])

    useEffect(() => {
        // dom method is used to go in the view point
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [typing,allmessages])

    if (loading) {
        return (
            <>
                <Loader />
            </>)
    }


    return (
        <div className="flex flex-col px-2 md:px-5 flex-1 w-[100%] md:w-[65%] md:ml-[35%] lg:w-[75%] lg:ml-[25%] absolute ">
            {/* header */}

            <div className='p-2 bg-black-800 h-[10vh] flex justify-between place-items-center'>
                <div className='flex py-2'>
                    <div className='user w-[50px] h-[50px] border rounded-full'>
                        <img className='rounded-full w-full h-full object-cover' src={name ? (name.picture) : null} alt="" />
                    </div>
                    <div className='uppercase text-xl px-2 py-1'>{
                        name ? (name.user) : 'user'
                    }</div>
                </div>

                <img className='mx-3 cursor md:hidden' id='nav' src="/assets/navigation.svg" width={30} height={30} alt="" />
            </div>


            {/* Messages */}
            <div className=" p-4 text-start space-y-4 overflow-y-auto h-[80vh] ">

                {
                    (allmessages && allmessages.length > 0) ? (
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
                        <h1 className='text-xl text-center'>
                            No Messages
                        </h1>
                    </div>)
                }

                {
                    typing ? (
                        <div className="flex items-start">
                            <div className="bg-gray-200 text-gray-900 p-3 rounded-xl rounded-bl-none max-w-[70%]">
                                <div className='loader-typing'></div>
                            </div>
                        </div>
                    ) : null

                }

                <div ref={messagesEndRef} />
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



