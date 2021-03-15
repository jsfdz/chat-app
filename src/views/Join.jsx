import { useState } from "react";
import { Link } from "react-router-dom";

const Join = ({ username }) => {
  const [room, setRoom] = useState(null);

  return (
    <div className="create-room">
      <p>create a room and share the link with your friends to join the chat</p>
      <div>
        <input
          placeholder="enter a name for the chat room"
          type="text"
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <div>
        <Link
          onClick={(e) => (!username || !room ? e.preventDefault() : null)}
          to={`/chat?name=${username}&room=${room}`}
        >
          <button type="submit">Join the chat</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
