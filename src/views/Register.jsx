import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { register } from '../redux/actions/auth'

const Register = ({ message, signup }) => {

    useEffect(() => {
        if (message === 'Access granted') {
            window.location.reload()
        }
    }, [message])

    const { handleSubmit, register, reset, errors, clearErrors } = useForm()

    const onSubmit = (data) => {
        signup(data)
        reset()
        clearErrors()
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <input
                    type='text'
                    name='username'
                    placeholder='type a username...'
                    ref={register({
                        required: 'your username is required',
                        pattern: {
                            value: /^[A-Za-z]{1,10}$/,
                            message:
                                'only letters, without spaces, 10 characters maximum, for example: UserName'
                        }
                    })} />
                <p>
                    {errors.username?.message}
                </p>

                <input
                    type='email'
                    name='email'
                    placeholder='type a email...'
                    ref={register({
                        required: 'your email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_.]+@[a-zA-Z.]+?\.[a-zA-Z]{2,3}$/,
                            message:
                                'please enter a valid email, for example: email@host.domain'
                        }
                    })} />
                <p>
                    {errors.email?.message}
                </p>

                <input
                    type='password'
                    name='password'
                    placeholder='type a password...'
                    ref={register({
                        required: 'your password is required',
                    })} />
                <p>
                    {errors.password?.message}
                </p>

                <input type='submit' value='create account' />

                {message && (
                    <p className={message !== 'Access granted' ? 'access-error' : 'access-successfuly'}>
                        {message}
                    </p>
                )}
            </form>
            <p>I have an account, <Link to='/login'>login</Link></p>
            <Link to='/'>back to home</Link>
        </>
    )
}

//Mapear todos los estados
const mapStateToProps = (state) => {
    return {
        message: state.message.message
    }
}

//Mapear todos los distpatch
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => {
            dispatch(register(user))
        }
    }
}

//Conexion al store
export default connect(mapStateToProps, mapDispatchToProps)(Register)