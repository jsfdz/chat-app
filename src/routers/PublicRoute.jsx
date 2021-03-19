<<<<<<< HEAD
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";

export const PublicRoute = ({ access, component: Component, ...rest }) => {
  return (
    <Route {...rest}>{!access ? <Component /> : <Redirect to="/" />}</Route>
  );
};

//Mapear todos los estados
const mapStateToProps = (state) => {
  return {
    access: state.auth.access,
  };
};

//Conexion al store
export default connect(mapStateToProps)(PublicRoute);
=======
import { Redirect, Route } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const PublicRoute = ({ component: Component, ...rest }) => {

    const { access } = useAuth()

    return (
        <Route {...rest}>
            {!access ? (
                <Component />
            ) : (
                <Redirect to='/' />
            )}
        </Route>
    )
}

export default PublicRoute
>>>>>>> master
