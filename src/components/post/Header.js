import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

export default function Header ({username}) {
    return(
    <div className="flex border-b border-normal h-4 p-4 py-8">
        <div className="flex items-center">
            <Link to={`/u/${username}`} className="flex items-center">
                <img
                className=" rounded-lg h-8 w-8 flex mr-3"
                src={`/images/avatars/${username}.jpg`}
                alt={`${username} profile avatar}`}
                />
                <p className="text-icon">{username}</p>
            </Link>
        </div>
    </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
  };