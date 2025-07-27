import axios, { all } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../utils/Socket'
import { joinroom } from '../utils/RoomID'
import BaseUrl from '../utils/BaseUrl'
import { Loader } from './Loader'
import useCurrentUser from '../Hooks/useCurrentUser'
import useAllChats from '../Hooks/useAllChats'
import useSocketHandler from '../Hooks/useSocketHandler'
import useJoinRoom from '../Hooks/useJoinRoom'
import { EmitingEvent, EventListening } from '../utils/SocketEvents'
import useTyping from '../Hooks/useTyping'
import useUpdateChat from '../Hooks/useUpdateChat'



const Chat = ({ name }) => {

    // sender and receiver
    const { receiver } = useParams()
    const user = useCurrentUser();


    //Received Messages
    const [NewMessage, SetNewMessages] = useState(null)
    useSocketHandler('received', SetNewMessages)

    // All Messages Among the Users and Updating Chat With New Messages
    const [allmessages, SetallMessages] = useState([])
    useAllChats(receiver, SetallMessages)
    useUpdateChat(NewMessage, SetallMessages)

    //creating Room
    const [room, setRoom] = useState(undefined)
    useJoinRoom(user, receiver, setRoom)

    // set Message
    const [message, setMessage] = useState({
        message: ''
    })

    // typo setup
    const [typing, setTyping] = useState(false)
    useTyping(room, message, setTyping)
    const messagesEndRef = useRef(null);


    //chatroom and loaders
    const [online, setOnline] = useState([undefined])
    const [loading, setLoading] = useState(false)




    const getdata = (e) => {
        const { value, name } = e.target
        setMessage({ ...message, [name]: value })
    }


    // trigger when the user and receiver id got by the state and create a room for the chatting


    const handlemessage = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData(e.target)
            const newmessage = formdata.get('message')
            if (room && message.message !== '') {
                socket.emit('message', { roomID: room, message: { message: message.message, receiver: receiver, createdAt: new Date() } })

                setMessage({ message: '' })

                const result = await axios.post(`${BaseUrl}/api/message/create/${receiver}`, { newmessage }, { withCredentials: true })
                console.log(result)
            }

        } catch (error) {
            console.log(error)
            throw error
        }
    }


    // update set typing false when new Message Arrive
    useEffect(() => {
        if (NewMessage) {
            setTyping(false)
        }
    }, [NewMessage])


    //auto scroll to the end when new message arrives
    useEffect(() => {
        // dom method is used to go in the view point
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [typing, allmessages])


    useEffect(() => {
        socket.on('onlineUser', (Online) => {
            /* console.log('online', Online) */
            setOnline(Online)
        })
        return () => {
            /* socket.emit('online', { userID: socket.id, _id: user,online: false }) */
            socket.off('onlineUser')
        }
    }, [receiver])

    if (loading) {
        return (
            <>
                <Loader />
            </>)
    }



    return (
        <div className="flex flex-col  flex-1 w-[100%] md:w-[65%] md:ml-[35%] lg:w-[75%] lg:ml-[25%] absolute  ">
            {/* header */}

            <div className='p-2 bg-black-800 h-[10vh] flex justify-between place-items-center'>
                <div className='flex py-2'>
                    <div className=' w-[50px] h-[50px] rounded-full'>
                        <img className='rounded-full w-full h-full object-cover' src={name ? (name.picture) : null} alt={' '} />
                        {/* {
                            (name && name.picture)?(name.picture ? (<img className='rounded-full w-full h-full object-cover' src={name ? (name.picture) : null} alt="" />) : (
                                <div>
                                    {name.user}
                                </div>
                            )):(null)
                        } */}
                    </div>
                    <div>
                        <div className='uppercase text-xl px-2'>{
                            name ? (name.user) : 'user'
                        }</div>
                        <h2 className='px-2'>
                            {
                                (online && name) ? ((online.map(on => on?._id).includes(name._id)) ? (<p className='text-green-500'>Online</p>) : <p className='text-gray-500'>Offline</p>) : null
                            }
                        </h2>
                    </div>
                </div>

                <img className='mx-3 cursor md:hidden' id='nav' src="/assets/menu.png" width={30} height={30} alt="" />
            </div>


            {/* Messages */}
            <div className=" p-4 text-start space-y-4 overflow-y-auto h-[80vh] border-t border-b border-gray-200">

                {
                    (allmessages && allmessages.length > 0) ? (
                        allmessages.map((message, index) => {
                            const time = new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })

                            if (message.receiver == receiver) {
                                return (

                                    <div key={index + 1} className="flex justify-end items-start">
                                        <div className='px-1 place-self-end text-gray-400 text-sm'>{time}</div>
                                        <div className="bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-[70%]  ">
                                            <p className='break-words'>{message.message}</p>
                                        </div>

                                    </div>


                                )
                            }
                            else {
                                return (

                                    <div key={index + 1} className="flex items-start">
                                        <div className="bg-gray-200 text-gray-900 p-3 rounded-xl rounded-bl-none max-w-[70%]">
                                            <p className='break-words'>{message.message}</p>
                                        </div>
                                        <div className='px-1 place-self-end text-gray-400 text-sm'>{time}</div>
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
                    className="flex-1 bg-gray-100  rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-transparent"
                />
                <button
                    type="submit"
                    className="ml-2 bg-black text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>

    )
}

export default Chat



