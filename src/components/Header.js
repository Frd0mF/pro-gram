import {useContext} from 'react'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes'
import {Link} from 'react-router-dom'

export default function Header () {

    const {firebase} = useContext(FirebaseContext)
    const {user} = useContext(UserContext)

    return (
        <header className="h-16 bg-primary">
            <div className="container max-w-screen-lg mx-auto h-full">
                <div className="flex justify-between h-full">
                    <div className="flex items-center align-items ml-4 cursor-pointer">
                        <Link to={ROUTES.HOMEPAGE} aria-label="ProGram logo">
                            <img className="w-6/12" src="/images/favicon.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="text-white text-center flex items-center align-items">
                        {user? (
                            <>
                                <Link to={ROUTES.HOMEPAGE} aria-label="Homepage">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-6 text-icon cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentcolor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                </Link>
                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => {firebase.auth().signOut()}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-6 text-icon cursor-pointer" viewBox="0 0 20 20" fill="currentcolor">
                                        <path fillRule="evenodd"
                                         d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className="flex items-center h-8 w-8 mr-4 flex inline md:hidden cursor-pointer">
                                    <Link to={`/u/${user.displayName}`}>
                                        <img className="rounded-xl" src={`/images/avatars/${user.displayName}.jpg`} alt="profile"></img>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN}>
                                    <button
                                    type="button" className="text-sm hover:text-gray-200">
                                        Log In
                                    </button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button
                                    type="button" className="text-sm py-2 px-4 mx-4 border border-white rounded hover:border-gray-200 hover:text-gray-200" >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}