import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";


const useCurrentUser = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {

        /* isMounted = true; */
        async function fetchData() {
            try {
                const getuser = await Axios(`api/user/single`, { withCredentials: true }, {})
                if (!getuser) {
                    console.log('getuser Not Received in useCurrentUser', getuser)
                    throw getuser
                }

                const User = getuser.data

                if (User.success === true) {
                    setUser(User.user)

                } else {
                    alert(User.message)
                }
            } catch (error) {
                console.log('Current User Hook Error :', error)
                throw error
            }
        }
        fetchData()

        return () => {
            /* isMounted = false; */ //understand it properly 
            setUser(null)
        }
    }, [])

    return user;
}

export default useCurrentUser