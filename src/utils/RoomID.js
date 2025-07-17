export const joinroom = (user1, user2) => {
    try {
        return [user1, user2].sort().join('_')
        
    } catch (error) {
        console.log('error while joining the room', error)
    }
} 