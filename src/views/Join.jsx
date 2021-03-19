import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Join = () => {

    const { user } = useAuth()
    const name = user.username
    const [room, setRoom] = useState(null)

    return (
        <>
            <p>create a room and share the link with your friends to join the chat</p>
            <div>
                <input placeholder='enter a name for the chat room' type='text' onChange={(e) => setRoom(e.target.value)} />
            </div>
            <Link onClick={(e) => (!name || !room ? e.preventDefault() : null)} to={`/chat/${name}/${room}`}>
                <button type="submit">Join the chat</button>
            </Link>
            <Link to='/'>back to home</Link>
        </>
    )
}

export default Join