import { GET_MESSAGES, GET_USERS } from '../actions/chat'

const initialState = {
    messages: [],
    users: []
}

export const chat = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, payload]
            }

        case GET_USERS:
            return {
                ...state,
                users: payload
            }

        default:
            return state
    }
}