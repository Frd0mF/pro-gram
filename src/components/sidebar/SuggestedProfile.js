import {useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {updateLoggedInUserFollowing, updateFollowedUserFollowers} from '../../services/firebase'

export default function SuggestedProfile ({profileDocId, username, profileId, userId, loggedInUserDocId}) {
   const [followed, setFollowed] = useState(false)

   async function handleFollowers() {
       setFollowed(true)
     
        //updating the followers of the logged user 
       await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
       //updating the followers of the followed user
       await updateFollowedUserFollowers(profileDocId, userId, false);

   }

    return !followed ? (
        <div className="sm:w-5/6 sm:mx-auto md:w-full md:mx-0 flex flex-row items-center align-items justify-between">
            <Link className="flex items-center" to={`/u/${username}`}>
            <img className="rounded-lg w-8 flex mr-3" src={`images/avatars/${username}.jpg`} alt="profile" />
            <h1 className="truncate font-bold w-text-purple-900">{username}</h1>
            </Link>
            <button
                type="button" 
                className="bg-purple-600 text-white text-sm font-bold my-2 mr-6 rounded-lg py-1.5 px-4 hover:bg-purple-900 opacity-50"
                onClick={handleFollowers}>
                Follow
            </button>
        </div>
    ) : null
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
  };