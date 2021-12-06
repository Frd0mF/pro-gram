import { useState, useEffect, useContext } from "react"
import FirebaseContext from "../context/firebase"

export default function AuthListener() {

    const {firebase} = useContext(FirebaseContext)
    //get logged in user from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    
    useEffect(() => {
        //check if user is logged and either save it or remove it from local storage
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser){
            localStorage.setItem('authUser', JSON.stringify(authUser))
            setUser(authUser)
            } else {
            localStorage.removeItem('authUser')
            setUser(null)
        }
        })
        return () => listener()
    },[firebase])
    return {user}
}