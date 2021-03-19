import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Join = () => {
  const { user, disconnect } = useAuth();
  const name = user.username;
  const [room, setRoom] = useState(null);

  return (
    <>
      <div className="create-room">
        <p>
          create a room and share the link with your friends to join the chat
        </p>
        <div>
          <input
            className="inp-join"
            placeholder="enter a name for the chat room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat/${name}/${room}`}
          >
            <button type="submit">Join the chat</button>
          </Link>
        </div>
      </div>
      <div className="btn-singout">
        <i className="fas fa-sign-out-alt" onClick={disconnect}></i>
      </div>
    </>
  );
};

export default Join;
