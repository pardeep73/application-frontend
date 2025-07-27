import { socket } from "./Socket";

export const EmitingEvent = (Event_Name, Data) => {
    if (Event_Name && Data) {
        socket.emit(Event_Name, Data)  // put callback here to handle the socket Errors More Effectively
    }
}


export const EventListening = (Event_Name, callback) => {
    if (Event_Name) {
        socket.on(Event_Name, (Data) => {
            try {
                callback(Data)
            } catch (error) {
                console.error('Event Listening Error in SocketEvents.js', error)
                throw error
            }
        })
    }
}

