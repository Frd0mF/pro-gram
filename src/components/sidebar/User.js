import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import {memo} from 'react'

const User = ({username, fullName}) =>
    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/u/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img className="rounded-2xl w-16 flex mr-3"
                    src={`images/avatars/${username}.jpg`}
                    alt="profile"/>
            <h1>{username}</h1>
            </div>
        </Link>
    )

export default User

User.prototypes = {
    username: PropTypes.string,
    fullName : PropTypes.string
}