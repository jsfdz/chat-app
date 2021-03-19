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