import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'


const Allusers = ({username}) => {
    
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    
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
    //console.log('username',username)

    return (
        <div id='users' className="overflow-y-auto  absolute w-[70%] h-[100vh] z-10 md:block md:w-[35%] lg:w-[25%]  place-items-start bg-black">
            <h2 className="text-xl font-semibold p-4 ">Users</h2>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user._id} onClick={() => {
                            navigate(`/message/${user._id}`)
                            
                            username({ user: user.name, picture:  user.profilePicture ? (user.profilePicture.url) : null })
                        }} className="p-4 cursor-pointer uppercase text-start">
                            <div className='flex gap-3'>
                                <div className='user w-[60px] h-[60px] border rounded-full'>
                                    <img className='rounded-full w-full h-full object-cover' src={user.profilePicture ? (user.profilePicture.url) : null} alt="" />
                                </div>
                                <div className='py-2'>
                                    <h2>
                                        {user.name}
                                    </h2>
                                </div>
                            </div>
                        </li>
                    )
                })}

                {/* Add more users here */}
            </ul>
        </div>
    )
}


export default Allusers