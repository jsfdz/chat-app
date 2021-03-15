import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/auth'
import Join from './Join'
import { generateProfileImg } from '../helpers/generateProfileImg'

const Home = ({ access, username, disconnect }) => {

    return (
        <>
            {access ? (
                <>
                    <h1>Welcome, <span className='profileImage'>{generateProfileImg(username)}</span> {username}</h1>
                    <button onClick={disconnect}>logout</button>
                    <Join username={username} />
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

//Mapear todos los estados
const mapStateToProps = (state) => {
    return {
        access: state.auth.access,
        username: state.auth.user?.username
    }
}

//Mapear todos los distpatch
const mapDispatchToProps = (dispatch) => {
    return {
        disconnect: () => {
            dispatch(logout())
        }
    }
}

//Conexion al store
export default connect(mapStateToProps, mapDispatchToProps)(Home)