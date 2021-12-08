import useUser from "../../hooks/use-user"
import User from './User'
import Suggestions from './Suggestions'

export default function Sidebar () {
    const { user: {docId, fullName,username,userId,folowing}} = useUser()
    return (
        <div className="p-4">
            <User username={username} fullName={fullName}/>
            <Suggestions userId={userId} following={folowing} loggedInUserDocId={docId}/>
        </div>
    )
}
