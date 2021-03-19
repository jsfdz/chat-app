import { Link } from 'react-router-dom'
import Join from '../views/Join'
import { generateProfileImg } from '../helpers/generateProfileImg'
import { useAuth } from '../hooks/useAuth'

const Home = () => {

    const { access, user } = useAuth()

    return (
        <>
            {access ? (
                <>
                    <h1>Welcome, <span className='profileImage'>{generateProfileImg(user.username)}</span> {user.username}</h1>
                    <Join />
                </>
            ) : (
                <>
                    <h1>Welcome to you Chat</h1>
                    <p>please login with your account to join the chat</p>
                    <Link to='/login'>login</Link>
                    <p>or</p>
                    <p>If you don't have an account, you can easily create one for free</p>
                    <Link to='/register'>register</Link>
                </>
            )}
        </>
    )
}

export default Home