import PropTypes from 'prop-types'
import { Navigate } from 'react-router'
import * as ROUTES from '../constants/routes'

export default function isLoggedIn({user, children}) {

    return (
        user ? <Navigate to={ROUTES.HOMEPAGE} /> : children  
    )
}

isLoggedIn.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
  }