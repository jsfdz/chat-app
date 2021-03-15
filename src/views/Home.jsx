import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/auth";
import Join from "./Join";

const Home = ({ access, username, disconnect }) => {
  return (
    <>
      {access ? (
        <div className="home">
          <div className="title">YouChat...</div>
          <h4>Welcome, {username}</h4>
          <div className="home-access">
            <Join username={username} />
            <div className="btn-singout">
              <i className="fas fa-sign-out-alt" onClick={disconnect}></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="home">
          <div className="title">YouChat...</div>
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

//Mapear todos los estados
const mapStateToProps = (state) => {
  return {
    access: state.auth.access,
    username: state.auth.user?.username,
  };
};

//Mapear todos los distpatch
const mapDispatchToProps = (dispatch) => {
  return {
    disconnect: () => {
      dispatch(logout());
    },
  };
};

//Conexion al store
export default connect(mapStateToProps, mapDispatchToProps)(Home);
