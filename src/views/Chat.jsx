import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";
import queryString from "query-string";
import { generateProfileImg } from "../helpers/generateProfileImg";
import { toBottom } from "../helpers/tobottom";

let socket;

const Chat = ({ token, currentuser }) => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { search } = useLocation();

  useEffect(() => {
    socket = io("https://academlo-chat.herokuapp.com/", {
      query: {
        token,
      },
    });

    const { name, room } = queryString.parse(search);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error.toString());
      }
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [token, search]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      toBottom();
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
          <span className="username">{currentuser}</span>
          <span className="profileImage imgTitle">
            {generateProfileImg(currentuser)}
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.user.token,
    currentuser: state.auth.user.username,
  };
};

export default connect(mapStateToProps)(Chat);
