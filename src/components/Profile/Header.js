import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useUser from '../../hooks/use-user'
import {isUerFollowingProfile, toggleFollow} from '../../services/firebase'

export default function Header ({photosCount, 
                            profile: {docId: profileDocId, userId: profileUserId, fullName, followers = [], following = [], username: profileUsername}, 
                            photosCollection, 
                            setFollowerCount,
                            followerCount}) {
    const {user} = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const followBtn = user.username && user.username !== profileUsername

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUerFollowingProfile(user.username, profileUserId)
            setIsFollowingProfile(!!isFollowing)
        }

        if (user.username && profileUserId){
            isLoggedInUserFollowingProfile()
        }
    }, [user.username, profileUserId])

    const handdleToggleFollow = async () =>  {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
    }


    return <div className="grid grid-cols-2 gap-4 place-items-center py-6 px-4 rouded justify-between max-w-screen-lg bg-secondary">
        <div className="row-span-2">
            {profileUsername ?
                <img
                 className="rounded-lg h-20 w-20  md:w-40 md:h-40"
                 alt={profileUsername}
                 src={`/images/avatars/${profileUsername}.jpg`}
                 onError={(e)=>{e.target.onerror = null; e.target.src="/images/avatars/Default.jpg"}}
                 />
                :   <Skeleton baseColor="#161B22" highlightColor="#0D1117" count={1} width={150} height={150} className="rounded-lg h-20 w-20 md:w-40 md:h-40" />
            }  
            <div className="mt-4 text-icon">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
        </div>
        <div>
            <p className="text-2xl md:text-3xl text-center mb-4 text-icon">{profileUsername}</p>
            {followBtn && (
                <button 
                    className="w-full py-1 px-2 bg-purple-900 font-bold text-sm rounded text-icon h-8 hover:bg-button"
                    type="button"
                    onClick={handdleToggleFollow}
                    >
                        {isFollowingProfile ? "Unfollow" : "Follow"}
                </button>
            )}
        </div>
        <div className="flex text-icon text-center">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-5 sm:mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-5 sm:mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
    </div>
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array
  }).isRequired
}