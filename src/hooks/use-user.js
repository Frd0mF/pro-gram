import {useState, useEffect, useContext} from 'react'
import UserContext from '../context/user'
import {getUserByID} from '../services/firebase'

export default function useUser() {
    const [activeUser, setActiveUser] = useState({})
    const {user} = useContext(UserContext)

    //get user data by id
    useEffect(() => {
        async function getUserObjByUserId(){
            //get user data based on id (comments,followers...)
            const [response] = await getUserByID(user.uid)
            setActiveUser(response)
        }
        if (user?.uid) {
            getUserObjByUserId()
        }
    }, [user])

    return {user: activeUser}
}