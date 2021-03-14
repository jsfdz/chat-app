import { signup, disconnect, signin } from '../../services/endpoints'
import { SET_MESSAGE } from './message'

//Constantes de acciones
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT = "LOGOUT"

//Creadores de acciones
export const register = (data) => (dispatch) => {
    const { username, email, password } = data
    return signup(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: { user: response.data.user }
            })

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message
            })

            return Promise.resolve()
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            dispatch({
                type: REGISTER_FAIL
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
    )
}

export const login = (data) => (dispatch) => {
    const { email, password } = data
    return signin(email, password).then(
        (response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: response.data.user }
            })

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message
            })

            return Promise.resolve()
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            dispatch({
                type: LOGIN_FAIL
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
    )
}

export const logout = () => (dispatch) => {
    disconnect()

    dispatch({
        type: LOGOUT
    })
}