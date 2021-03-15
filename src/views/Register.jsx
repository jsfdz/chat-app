import { useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/auth";

const Register = ({ message, signup }) => {
  useEffect(() => {
    if (message === "Access granted") {
      window.location.reload();
    }
  }, [message]);

  const { handleSubmit, register, reset, errors, clearErrors } = useForm();

  const onSubmit = (data) => {
    signup(data);
    reset();
    clearErrors();
  };

  return (
    <div className="log-container">
      <div className="title">
        <div className="title-icon">
          <Link to="/">
            <i className="fas fa-chevron-left"></i>
          </Link>
          <img src="./img/iconchat.svg" alt="" />
          YouChat...
        </div>
      </div>
      <h4>Sign Up</h4>
      <div className="msg">
        {message && (
          <p
            className={
              message !== "Access granted"
                ? "access-error"
                : "access-successfuly"
            }
          >
            {message}
          </p>
        )}
      </div>
      <div className="log-content">
        <div className="form-content">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="type a username..."
                ref={register({
                  required: "your username is required",
                  pattern: {
                    value: /^[A-Za-z]{1,10}$/,
                    message:
                      "only letters, without spaces, 10 characters maximum, for example: UserName",
                  },
                })}
              />
              <p className="error">{errors.username?.message}</p>
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="type a email..."
                ref={register({
                  required: "your email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.]+@[a-zA-Z.]+?\.[a-zA-Z]{2,3}$/,
                    message:
                      "please enter a valid email, for example: email@host.domain",
                  },
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="type a password..."
                ref={register({
                  required: "your password is required",
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </div>
            <div className="btn-submit">
              <input type="submit" value="create account" />
            </div>
          </form>
          <p>
            I have an account, <Link to="/login">login</Link>
          </p>
        </div>
        <div className="img-container">
          <img src="./img/phone.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

//Mapear todos los estados
const mapStateToProps = (state) => {
  return {
    message: state.message.message,
  };
};

//Mapear todos los distpatch
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => {
      dispatch(register(user));
    },
  };
};

//Conexion al store
export default connect(mapStateToProps, mapDispatchToProps)(Register);
