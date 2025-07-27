import React, { useEffect } from 'react'
import { joinroom } from '../utils/RoomID'
import { EmitingEvent } from '../utils/SocketEvents'

const useJoinRoom = (Sender, Receiver, callback) => {
    useEffect(() => {
        
            if (Sender && Receiver) {
                const Room_ID = joinroom(Sender, Receiver)
                if (Room_ID) {
                    try {
                        EmitingEvent('join_room', Room_ID);
                        callback(Room_ID)
                    } catch (error) {
                        console.log('Join Room Error In useJoinRoom', error)
                        throw error
                    }
                }
            }
        
       
    }, [Sender, Receiver])
}

export default useJoinRoom