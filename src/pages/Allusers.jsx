import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Allusers = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:5000/api/user/all', {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
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
        <div className="overflow-y-auto">
            <h2 className="text-xl font-semibold p-4 ">Users</h2>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user._id} onClick={() => {
                            navigate(`/message/${user._id}`)
                        }} className="p-4 cursor-pointer uppercase">{user.name}</li>
                    )
                })}

                {/* Add more users here */}
            </ul>
        </div>
    )
}

export default Allusers