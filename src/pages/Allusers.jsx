import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../utils/Socket'
import useCurrentUser from '../Hooks/useCurrentUser'
import useAllUsers from '../Hooks/useAllUsers'
import useLastMessage from '../Hooks/useLastMessage'
import useSocketHandler from '../Hooks/useSocketHandler'


const Allusers = ({ username }) => {


    const navigate = useNavigate()
    const user = useCurrentUser();

    const [newmessage, setnewmessage] = useState()
    useSocketHandler('received',setnewmessage)


    const [All_Users, SetAllUsers] = useState([])
    useAllUsers(user, newmessage, SetAllUsers);


    const [lastMessage, SetUsersLastMessage] = useState([])
    useLastMessage(All_Users, SetUsersLastMessage)



    const [online, setOnline] = useState([undefined])



    useEffect(() => {
        if (user) {
            /*  console.log('user', user) */
            socket.emit('online', { userID: socket.id, _id: user, online: true })
        }
    }, [user])

    useEffect(() => {
        socket.on('onlineUser', (Online) => {
            /*  console.log('online', Online) */
            setOnline(Online)
        })
        return () => {
            /* socket.emit('online', { userID: socket.id, _id: user,online: false }) */
            socket.off('onlineUser')
        }
    }, [])



    /* console.log('online state', online) */

    return (
        <div id='users' className="overflow-y-auto bg-gray-50 md:bg-transparent  absolute w-full h-[100vh] z-10 md:block md:w-[35%] lg:w-[25%]  place-items-start border-r border-gray-200">
            <h2 className="text-xl font-semibold p-4 ">Chats</h2>
            <ul className='w-full'>
                {(All_Users) ? (
                    All_Users.map((user, i) => {

                        return (
                            <li key={user._id} onClick={() => {

                                navigate(`/message/${user._id}`)

                                username({ _id: user._id, user: user.name, picture: user.profilePicture ? (user.profilePicture.url) : null })
                            }} className="p-1 cursor-pointer  text-start  w-full">
                                <div className='flex gap-3 bg-gray-100 p-1'>
                                    <div className='user w-[60px] h-[60px] rounded-full '>
                                        <img className='rounded-full w-full h-full object-cover' src={user.profilePicture ? (user.profilePicture.url) : null} alt=' ' />
                                    </div>
                                    <div className='py-2'>
                                        <h2 className='uppercase'>
                                            {user.name}
                                        </h2>
                                        <p className='text-sm text-gray-500 overflow-ellipsis overflow-hidden whitespace-nowrap  w-[70vw] md:w-[20vw] lg:w-[15vw] '>
                                            {
                                                /* (online && All_Users) ? ((online.map(on => on?._id).includes(user._id)) ? (<p className='text-green-500'>Online</p>) : <p className='text-gray-500'>Offline</p>) : null */
                                                (lastMessage && lastMessage[i]) ? (lastMessage[i].message) : (<>No Chats</>)
                                            }
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                ) : (<></>)

                }
            </ul>
        </div>
    )
}



export default Allusers