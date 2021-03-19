import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useChat } from '../hooks/useChat'
import io from 'socket.io-client'
import { generateProfileImg } from '../helpers/generateProfileImg'
import { Link, useRouteMatch } from 'react-router-dom'

let socket

const Chat = () => {

    const { params } = useRouteMatch()
    const { name, room } = params

    const { user } = useAuth()
    const { messages, setMessages, users, setUsers } = useChat()

    const [message, setMessage] = useState('')
    const messagesEndRef = useRef(null)

    useEffect(() => {

        if (user) {
            socket = io('https://academlo-chat.herokuapp.com/', {
                query: {
                    token: user.token
                }
            })

            socket.emit('join', { name, room }, (error) => {
                if (error) {
                    console.log(error.toString())
                }
            })

            socket.on('message', (message) => {
                setMessages(message)
            })

            socket.on('roomData', ({ users }) => {
                setUsers(users)
            })
        }
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        messagesEndRef.current
            .scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <>
            <div className="chat">
                <div className="box">
                    <div className="sidebar">
                        <div className="side">
                            <div className="header">
                                <h1>you Chat</h1>
                            </div>
                            <div className="side-inner">
                                <div className="side-list">
                                    {users.map((user) => {

                                        return (
                                            <div key={user.id} className="side-item">
                                                <div className="side-image">
                                                    <div className="img-profile">
                                                        <span className='profileImage'>{generateProfileImg(user.name)}</span>
                                                    </div>
                                                </div>
                                                <div className="side-name">
                                                    <span>{user.name}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="main">
                            <div className="header">
                                <div className="current-user">
                                    <span>{user.username}</span>
                                    <span className='profileImage'>{generateProfileImg(user.username)}</span>
                                    <Link to={'/'}>
                                        <button>logout chat</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="main-wrapper">
                                <div className="main-inner">
                                    <div className="messages-container">
                                        {messages.map((message, index) => {

                                            const { user, text } = message

                                            return (
                                                <div key={index + 1} className="message-item">
                                                    {user === user.username ? (
                                                        <div className="message right">
                                                            <span className='profileImage'>{generateProfileImg(user.username)}</span>
                                                            <div className="message-inner">
                                                                <div className="message-user">
                                                                    <div className="user-name">{user.username}</div>
                                                                </div>
                                                                <p>
                                                                    {text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="message">
                                                            <span className='profileImage'>{generateProfileImg(user)}</span>
                                                            <div className="message-inner">
                                                                <div className="message-user">
                                                                    <div className="user-name">{user}</div>
                                                                </div>
                                                                <p>
                                                                    {text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <div className="input-inner">
                                        <div className="text-content">
                                            <input className="input" type="text" placeholder="write you message" value={message} onChange={({ target: { value } }) => setMessage(value)} onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />
                                        </div>
                                        <div className="button-containe">
                                            <button className="sendButton" onClick={(event) => sendMessage(event)}>send message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat