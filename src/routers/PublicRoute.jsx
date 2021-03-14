import { Redirect, Route } from 'react-router'
import { connect } from 'react-redux'

export const PublicRoute = ({ access, component: Component, ...rest }) => {

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

//Mapear todos los estados
const mapStateToProps = (state) => {
    return {
        access: state.auth.access
    }
}

//Conexion al store
export default connect(mapStateToProps)(PublicRoute)