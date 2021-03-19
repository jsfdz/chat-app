import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { message, signin } = useAuth();

  useEffect(() => {
    if (message === "Access granted") {
      window.location.reload();
    }
  }, [message]);

  const { handleSubmit, register, reset, errors } = useForm();

  const onSubmit = (data) => {
    signin(data);
    reset();
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
      <h4>Sign In</h4>
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
              <p>{errors.password?.message}</p>
            </div>

            <div className="btn-submit">
              <input type="submit" value="Login" />
            </div>
          </form>
          <p>
            i'm a new user, <Link to="/register">signup</Link>
          </p>
        </div>
        <div className="img-container">
          <img src="./img/phone.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
