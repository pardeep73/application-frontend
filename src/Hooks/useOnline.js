import React, { useEffect } from 'react'
import { socket } from '../utils/Socket'
import { EmitingEvent, EventListening } from '../utils/SocketEvents'

const useOnline = (user, callback) => {
    useEffect(() => {
        if (user) {
            EmitingEvent('online', { userID: socket.id, _id: user, online: true })
        }
        EventListening(`onlineUser`, callback)
        return () => {
            socket.off('onlineUser')
        }
    }, [user])
}

export default useOnline