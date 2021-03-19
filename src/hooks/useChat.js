import { useSelector, useDispatch } from 'react-redux'
import { getMessages, getUsers } from '../redux/actions/chat'

export const useChat = () => {

    const { users, messages } = useSelector(state => state.chat)

    const dispatch = useDispatch()
    const setMessages = message => dispatch(getMessages(message))
    const setUsers = user => dispatch(getUsers(user))

    return { messages, setMessages, users, setUsers }
}