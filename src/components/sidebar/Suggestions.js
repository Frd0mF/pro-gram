import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getSuggestedProfiles} from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile'

export default function Suggestions({ userId, following, loggedInUserDocId }) {

    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response)
        }
        //wait untill userId is passed
        if (userId){
            suggestedProfiles()
        }
    },[userId])

    return(
        !profiles ? (
            <Skeleton baseColor="#161B22" highlightColor="#0D1117" count={1} height={150} className="mt-5" />
        ) : profiles.length > 0 ? (
            <div className="rounded flex flex-col text-icon ">
                <div className="text-sm flex items-center align-items justify-between mb-2">
                    <p className="font-bold text-secondary"> Suggestions for you</p>
                </div>
                <div className="mt-4 grid gap-5">
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            profileDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                    ))}
                </div>
            </div>
        ) : null)

}

Suggestions.prototype = {
    userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
}
