import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {memo} from 'react'

const User = ({username, fullName}) =>
    !username || !fullName ? (
        <Skeleton baseColor="#161B22" highlightColor="#0D1117" count={1} height={65} />
    ) : (
        <Link to={`/u/${username}`} className="hidden md:grid grid-cols-4 gap-4 mt-2 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img className="rounded-2xl w-16 flex mr-3"
                    src={`images/avatars/${username}.jpg`}
                    onError={(e)=>{e.target.onerror = null; e.target.src="/images/avatars/Default.jpg"}}
                    alt="profile"/>
            </div>
            <div className="col-span-3 text-icon ">
                <p className="font-bold text-sd">{username}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    )

export default memo(User)

User.prototypes = {
    username: PropTypes.string,
    fullName : PropTypes.string
}

