import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Chat = () => {

    const container = useRef(null)
    const { receiver } = useParams()
    const [allmessages, setallmessages] = useState([])
    const [message, setMessage] = useState({
        message: ''
    })



    const getdata = (e) => {
        const { value, name } = e.target
        setMessage({ ...message, [name]: value })
    }

    const handlemessage = async (e) => {
        try {
            e.preventDefault();
            console.log(message)
            const result = await axios.post(`http://localhost:5000/api/message/create/${receiver}`, message, { withCredentials: true })

            console.log(result)

            setMessage({message:''})


        } catch (error) {
            console.log(error)
            throw error
        }
    }

    useEffect(() => {
        axios.post(`http://localhost:5000/api/message/getall/${receiver}`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                if (res.data.success === true) {
                    setallmessages(res.data.data)

                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])

    return (

        <div className="flex flex-col flex-1">
            {/* Messages */}
            <div className="flex-1 p-4 text-start space-y-4 overflow-y-auto ">
               {allmessages.map((message)=>{
                if(message.receiver == receiver){
                    return(
                          <div key={message._id} className="flex justify-end items-start">
                            <div className="bg-blue-600 text-white p-3 rounded-xl rounded-br-none max-w-[70%]">
                                <p>{message.message}</p>
                            </div>
                        </div>

                    )
                }
                else{
                    return(
                      
                        <div key={message._id} className="flex items-start">
                            <div className="bg-gray-200 text-gray-900 p-3 rounded-xl rounded-bl-none max-w-[70%]">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )
                }
               })}
            </div>
            {/* Input box */}
            <form onSubmit={handlemessage} className="flex items-center p-3  ">
                <input
                    type="text"
                    placeholder="Type your message..."
                    name='message'
                    value={message.message}
                    onChange={getdata}
                    className="flex-1  rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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



