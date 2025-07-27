import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'

const useLastMessage = (receiverId,callback) => {

    /* const [UsersLastMessage, SetUsersLastMessage] = useState([]) */

    useEffect(() => {
        async function fetchData() {
            try {
                if (receiverId) {
                    const Result = await Axios(`api/message/last`, { withCredentials: true }, { receiverId: receiverId })

                    if (!Result) {
                        console.error('Last Messages from users are not Fetched in the useLastMessage', Result)
                        throw Result
                    }

                    const AllUsersLastMessages = Result.data

                    if (AllUsersLastMessages.success === true) {
                        /* SetUsersLastMessage(AllUsersLastMessages.data) */
                        callback(AllUsersLastMessages.data)
                    } else {
                        alert(AllUsersLastMessages.message)
                    }
                }
            } catch (error) {
                console.error('Last Message Hook Error :', error)
                throw error
            }
        }
        fetchData();

        return () => {
            /* SetUsersLastMessage([]) */
        }
    }, [receiverId,/* lastest message to update the last Message */])

    /* return UsersLastMessage; */
}

export default useLastMessage