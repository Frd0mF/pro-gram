import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from "../components/Header"
import ProfileData from "../components/Profile"


export default function Profile () {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function checkUserExists() {
        //get user id
        const [user] = await getUserByUsername(username);
        if (user?.userId) {
          setUser(user);
        } else {
            navigate(ROUTES.NOT_FOUND)
        }
      }
  
      checkUserExists();
    }, [username, navigate]);
  
    return user?.username ? (
      <div className="bg-background h-screen">
        <Header />
        <div className="mx-auto max-w-screen-lg">
        <ProfileData user={user} />
        </div>
      </div>
    ) : null;
  }


 