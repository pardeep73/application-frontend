import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseUrl from '../utils/BaseUrl'

const Allusers = () => {
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


    return (
        <div className="overflow-y-auto w-[10%] md:block md:w-[15%] lg:w-[20%] hidden place-items-start bg-black">
            <h2 className="text-xl font-semibold p-4 ">Users</h2>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user._id} onClick={() => {
                            navigate(`/message/${user._id}`)
                        }} className="p-4 cursor-pointer uppercase text-start">{user.name}</li>
                    )
                })}

                {/* Add more users here */}
            </ul>
        </div>
    )
}

export default Allusers