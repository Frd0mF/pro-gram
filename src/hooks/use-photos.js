import {useState, useEffect, useContext} from 'react'
import UserContext from '../context/user'
import { getPhotos, getUserByID } from '../services/firebase'

export default function usePhotos(){

    const [photos,setPhotos] = useState(null)
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext)

    useEffect(() => {
        async function getTimeLinePhotos(){
            //getting user followers from firebase
            const [{following}] = await getUserByID(userId)

            let followedUserPhotos = []
            if (following.length > 0) {
                //getting followed users photos
                followedUserPhotos = await getPhotos(userId, following)
    
            }
            //sort photos by date
            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated)
            setPhotos(followedUserPhotos)
        }
        getTimeLinePhotos()
    },[userId])
   

    return{photos}
}