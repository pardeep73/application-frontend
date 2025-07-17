import { io } from 'socket.io-client'
import BaseUrl from './BaseUrl'

export const socket = io(BaseUrl, {
    withCredentials: true // allows cookies to be sent (for auth)
})

