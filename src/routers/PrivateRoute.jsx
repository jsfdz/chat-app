import { Redirect, Route, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { access } = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {access ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
