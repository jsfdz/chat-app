import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../views/Home";
import Register from "../views/Register";
import Login from "../views/Login";
import Chat from "../views/Chat";
import NotFound from "../views/NotFound";

export const AppRouter = () => {
  return (
    <div className="containet">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/chat/:name/:room" component={Chat} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};
