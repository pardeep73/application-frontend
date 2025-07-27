import React, { useEffect, useState } from 'react'
import { socket } from '../utils/Socket'
import { EventListening } from '../utils/SocketEvents'

const useSocketHandler = (Socket_Event, callback) => {

    useEffect(() => {
        EventListening(Socket_Event, callback)
        return () => {
            socket.off(Socket_Event)
        }
    }, [])

}

export default useSocketHandler