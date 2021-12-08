import PropTypes from 'prop-types'
import { Navigate } from 'react-router'
import * as ROUTES from '../constants/routes'

export default function ProtectedRoute({user, children}) {
    console.log(user)
    return (
        user ? children : <Navigate to={ROUTES.LOGIN} />
    )
}

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
  }