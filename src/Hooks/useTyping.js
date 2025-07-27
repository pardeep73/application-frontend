import React, { useEffect } from 'react'
import { EmitingEvent, EventListening } from '../utils/SocketEvents';
import { socket } from '../utils/Socket';

    const useTyping = (room, message, callback) => {

        useEffect(() => {

            if (room && message.message != '') {
                EmitingEvent('typing', { room, typing: true })
            }
            const timeout = setTimeout(() => {
                EmitingEvent('typing', { room, typing: false })
            }, 800);

            EventListening('typing_message', callback)
            
            return () => {
                clearTimeout(timeout)
                socket.off('typing_message')
            }
        }, [room, message])
    }

    export default useTyping