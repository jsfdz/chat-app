import { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = ({ username }) => {

    const [room, setRoom] = useState(null)

    return (
        <>
            <p>create a room and share the link with your friends to join the chat</p>
            <div>
                <input placeholder='enter a name for the chat room' type='text' onChange={(e) => setRoom(e.target.value)} />
            </div>
            <Link onClick={(e) => (!username || !room) ? e.preventDefault() : null} to={`/chat?name=${username}&room=${room}`}>
                <button type="submit">join the chat</button>
            </Link>
        </>
    )
}

export default Join