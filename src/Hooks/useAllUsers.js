import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'

const useAllUsers = (user,NewMessage,callback) => {

   /*  const [AllUsers, SetAllUsers] = useState([]) */

    useEffect(() => {
        async function fetchdata() {
            try {
                /* isMounted = true; */
                const All_Users = await Axios('api/user/all', { withCredentials: true }, {})

                if (!All_Users) {
                    console.error('All_Message are not Fetched in the UseAllUsers', All_Users)
                    throw All_Users
                }

                const getAllUsers = All_Users.data

                if (getAllUsers.success === true) {
                    /* SetAllUsers(getAllUsers.data) */
                    callback(getAllUsers.data)
                } else {
                    alert(getAllUsers.message)
                }

            } catch (error) {
                console.error('All Users Hook Error :', error)
                throw error;
            }

        }
        fetchdata()

        return () => {
            /* isMounted = false; */
           /*  SetAllUsers([]) */
        }

    }, [user,NewMessage])

    /* return AllUsers */
}

export default useAllUsers