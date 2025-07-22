import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'
import { socket } from '../utils/Socket'


const Allusers = ({ username }) => {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const [online, setOnline] = useState([undefined])
    const [user, setuser] = useState(null)


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

    useEffect(() => {
        axios.post(`${BaseUrl}/api/user/all`, {}, { withCredentials: true })
            .then((res) => {
                if (res.data.success === true) {
                    setUsers(res.data.data)

                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])


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
        <div id='users' className="overflow-y-auto  absolute w-[70%] h-[100vh] z-10 md:block md:w-[35%] lg:w-[25%]  place-items-start bg-black">
            <h2 className="text-xl font-semibold p-4 ">Users</h2>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user._id} onClick={() => {
                            navigate(`/message/${user._id}`)

                            username({ _id: user._id, user: user.name, picture: user.profilePicture ? (user.profilePicture.url) : null })
                        }} className="p-4 cursor-pointer uppercase text-start">
                            <div className='flex gap-3'>
                                <div className='user w-[60px] h-[60px] rounded-full'>
                                    <img className='rounded-full w-full h-full object-cover' src={user.profilePicture ? (user.profilePicture.url) : null} alt=' '/>
                                </div>
                                <div className='py-2'>
                                    <h2>
                                        {user.name}
                                    </h2>
                                    <h2>
                                        {
                                            (online && users) ? ((online.map(on => on?._id).includes(user._id)) ? (<p className='text-green-500'>Online</p>) : <p className='text-gray-500'>Offline</p>) : null
                                        }
                                    </h2>
                                </div>
                            </div>
                        </li>
                    )
                })}

                
            </ul>
        </div>
    )
}


export default Allusers