import { useSelector, useDispatch } from "react-redux";
import { logout, login, register } from '../redux/actions/auth'

export const useAuth = () => {

    const { access, user } = useSelector(state => state.auth)
    const message = useSelector(state => state.message.message)

    const dispatch = useDispatch()
    const disconnect = () => dispatch(logout())
    const signin = user => dispatch(login(user))
    const signup = user => dispatch(register(user))

    return { access, user, message, disconnect, signin, signup }
}