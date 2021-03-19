export const GET_MESSAGES = 'GET_MESSAGES'
export const GET_USERS = 'GET_USERS'

export const getMessages = message => {
    console.log(message)
    return {
        type: 'GET_MESSAGES',
        payload: message
    }
}

export const getUsers = user => (
    {
        type: 'GET_USERS',
        payload: user
    }
)