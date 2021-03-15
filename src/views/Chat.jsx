import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";
import queryString from "query-string";

let socket;

const Chat = ({ token }) => {
  const { search } = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(search);

    const options = {
      query: {
        token,
      },
    };

    socket = io("https://academlo-chat.herokuapp.com/", options);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error.toString());
      }
    });

    socket.on("message", (message) => {
      console.log(message);
      // setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      console.log(users);
    });
  }, [token, search]);

  return (
    <>
      <h1>Chat</h1>
      <Link to="/">Salir de la sala</Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.user.token,
  };
};

export default connect(mapStateToProps)(Chat);
