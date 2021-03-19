import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { message, signin } = useAuth()

    useEffect(() => {
        if (message === 'Access granted') {
            window.location.reload()
        }
    }, [message])

    const { handleSubmit, register, reset, errors } = useForm()

    const onSubmit = (data) => {
        signin(data)
        reset()
    }

    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

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

                <input type='submit' value='login' />

                {message && (
                    <p className={message !== 'Access granted' ? 'access-error' : 'access-successfuly'}>
                        {message}
                    </p>
                )}

            </form>
            <p>i'm a new user, <Link to='/register'>signup</Link></p>
            <Link to='/'>back to home</Link>
        </>
    )
}

export default Login