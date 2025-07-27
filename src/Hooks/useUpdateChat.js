import React, { useEffect } from 'react'

const useUpdateChat = (New_Message, callback) => {
    useEffect(() => {
        if (New_Message) {
            try {
                callback((prev) => [...prev, New_Message])
            } catch (error) {
                console.log('Message Updation Failed in the useUpdateChat.js', error)
                throw error
            }
        }
    }, [New_Message])
}

export default useUpdateChat