import React, { useEffect, useState } from "react";

import Axios from "../utils/Axios";

const useAllChats = (receiver,callback) => {

    useEffect(() => {
        async function fetchData() {
            try {
                const Result = await Axios(`api/message/getall/${receiver}`, { withCredentials: true }, {})

                if (!Result) {
                    console.error('All Chats are not Fetched in the useAllChats', Result)
                    throw Result
                }

                const All_Chats = Result.data

                if (All_Chats.success === true) {
                    callback(All_Chats.data)
                } else {
                    alert(All_Chats.message)
                }

            } catch (error) {
                console.error('All Chats Hook Error :', error)
                throw error
            }
        }
        fetchData();

        return () => {
           
        }
    }, [receiver])

}

export default useAllChats