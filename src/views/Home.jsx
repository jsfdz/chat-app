import { Link } from "react-router-dom";
import Join from "../views/Join";
import { generateProfileImg } from "../helpers/generateProfileImg";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { access, user } = useAuth();

  return (
    <>
      {access ? (
        <div className="home">
          <div className="title">
            <div className="title-icon">
              <img src="./img/iconchat.svg" alt="" />
              YouChat...
            </div>
            <div className="user-icon">
              <span className="profileImage imgTitle">
                {generateProfileImg(user.username)}
              </span>
            </div>
          </div>
          <div className="home-access">
            <h4>Welcome, {user.username}</h4>
            <Join />
          </div>
        </div>
      ) : (
        <div className="home">
          <div className="title">
            <div className="title-icon">
              <img src="./img/iconchat.svg" alt="" />
              YouChat...
            </div>
          </div>
          <h4>Welcome to roomChat</h4>
          <div className="home-container">
            <div className="option-login">
              <p>Select a way to enter the room</p>
              <div>
                <Link to="/login">
                  <p className="login">Login</p>
                </Link>
                <span>Or</span>
                <Link to="/register">
                  <p className="register">Register</p>
                </Link>
              </div>
            </div>
            <div className="img-container">
              <img src="./img/phone.svg" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
