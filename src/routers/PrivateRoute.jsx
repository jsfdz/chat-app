import { Redirect, Route, useLocation } from 'react-router'
import { connect } from 'react-redux'


const PrivateRoute = ({ access, component: Component, ...rest }) => {
    const location = useLocation()

    return (
        <Route {...rest}>
            {access ? (
                <Component />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: location } }} />
            )}
        </Route>
    )
}

//Mapear todos los estados
const mapStateToProps = (state) => {
    return {
        access: state.auth.access
    }
}

//Conexion al store
export default connect(mapStateToProps)(PrivateRoute)