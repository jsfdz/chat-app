import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import io from "socket.io-client";
import { generateProfileImg } from "../helpers/generateProfileImg";
import { Link, useRouteMatch } from "react-router-dom";

let socket;

const Chat = () => {
  const { params } = useRouteMatch();
  const { name, room } = params;

  const { user } = useAuth();
  const { messages, setMessages, users, setUsers } = useChat();

  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      socket = io("https://academlo-chat.herokuapp.com/", {
        query: {
          token: user.token,
        },
      });

      socket.emit("join", { name, room }, (error) => {
        if (error) {
          console.log(error.toString());
        }
      });

      socket.on("message", (message) => {
        setMessages(message);
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="room">
      <div className="title">
        <div className="title-icon">
          <img src="./img/iconchat.svg" alt="" />
          YouChat...
        </div>
        <div className="user-icon">
          <span className="username">{user.username}</span>
          <span className="profileImage imgTitle">
            {generateProfileImg(user.username)}
          </span>
          {/* <Link to="/">Salir de la sala</Link> */}
        </div>
      </div>
      <div className="room-container">
        <div className="sidebar">
          <h4>Conversations</h4>
          <div className="side-list">
            {users.map((user) => {
              return (
                <div key={user.id} className="side-item">
                  <span className="profileImage">
                    {generateProfileImg(user.name)}
                  </span>
                  <span>{user.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wrapper">
          <div className="chat">
            <div className="chat-container">
              {messages.map((message, index) => {
                if (message) toBottom();
                const { user, text } = message;
                return (
                  <div key={index + 1} className="message-item">
                    {user === currentuser ? (
                      <div className="message message-right">
                        <div>
                          <span className="profileImage">
                            {generateProfileImg(currentuser)}
                          </span>
                        </div>
                        <div>
                          <p className="username-chat">{currentuser}</p>
                          <p>{text}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="message message-left">
                        <div>
                          <span className="profileImage">
                            {generateProfileImg(user)}
                          </span>
                        </div>
                        <div>
                          <p className="username-chat">{user}</p>
                          <p>{text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="write you message"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : null
              }
            />
            <i
              className="fas fa-paper-plane"
              onClick={(event) => sendMessage(event)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
