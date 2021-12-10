import {useState, useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExists } from '../services/firebase'

export default function Signup() {
    //get navigation
    const navigate = useNavigate()
    //get firebase context
    const {firebase} = useContext(FirebaseContext)

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [emailAdress, setEmailAdress] = useState('')
    const [password, setPassword] = useState('')
    const [repeatpwd, setRepeatpwd] = useState('')
    const [error, setError] = useState('')
    const isInvalid = fullName === '' || username === '' || emailAdress === '' || password === '' || repeatpwd === '' 
    //handle loging
    const signupHandler = async (event) => {
        event.preventDefault()
        //check if username exists
        if (password.length < 7){
            setError ('Password should be more than 8 characters long')
            setPassword('')
            setRepeatpwd('') 
        }
        else if (password !== repeatpwd) {
            setError ('Passwords dont match')
            setPassword('')
            setRepeatpwd('') 
        }
        else {
          //check if username exists
        const usernameExists = await doesUsernameExists(username)
        if (usernameExists.length === 0) {
            try {
                //create new user with email and password
                const createdUser = await firebase.auth().createUserWithEmailAndPassword(emailAdress, password)
                //attach username to user data
                await createdUser.user.updateProfile({
                    displayName : username
                })
                //add firestore collection with all the data
                await firebase.firestore().collection('users').add({
                    userId: createdUser.user.uid,
                    username : username,
                    fullName,
                    emailAdress: emailAdress.toLocaleLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated : Date.now()
                })
                navigate(ROUTES.HOMEPAGE)
            } catch (error) {
                setEmailAdress('')
                setUsername('')
                setPassword('')
                setRepeatpwd('')
                setError(error.message)
            }
        } else {
            setUsername('')
            setPassword('')
            setRepeatpwd('')
            setError('Username already taken')
        }
    }
    }

    useEffect (()=>{
        document.title = 'Sign Up - ProGram'
    },[])

    return(
       <div className="flex text-white font-sans font-light flex-col h-screen bg-primary sm:bg-secondary items-center">
           <img className="w-16 mt-6" src="./images/favicon.png" alt="logo"/>
           <h1 className="mt-4 text-2xl">Sign in to ProGram</h1>
           <div className="flex flex-col mt-6 w-80 sm:w-96 border border-normal rounded-md">
               <form className="pt-4 px-5 text-sm sm:bg-primary sm:px-9" onSubmit={signupHandler} method="POST">
               {error && <p className="mb-4 text-sm text-red-500"> {error} </p>}

               <label className="flex flex-col"> Full Name
                <input 
                aria-label="Enter your full name"
                type="text" 
                value = {fullName}
                className="text-sm bg-transparent w-full mr-3 mt-2 py-3.5 px-4 h-2 sm:bg-secondary border border-normal rounded-lg focus:outline-none focus:border-purple-900"
                onChange ={({target})=>setFullName(target.value)}
                />
                </label>

                <label className="flex flex-col mt-3"> Username
                <input 
                aria-label="Enter your username"
                type="text" 
                value = {username}
                className="text-sm bg-transparent w-full mr-3 mt-2 py-3.5 px-4 h-2 sm:bg-secondary border border-normal rounded-lg focus:outline-none focus:border-purple-900"
                onChange ={({target})=>setUsername(target.value)}
                />
                </label>

                <label className="flex flex-col mt-3"> Email Address
                <input 
                aria-label="Enter your email adress"
                type="text" 
                value = {emailAdress}
                className="text-sm bg-transparent w-full mr-3 mt-2 py-3.5 px-4 h-2 sm:bg-secondary border border-normal rounded-lg focus:outline-none focus:border-purple-900"
                onChange ={({target})=>setEmailAdress(target.value)}
                />

                </label>
                <label className="flex flex-col mt-3"> Password
                <input 
                aria-label="Enter your password"
                type="password"
                value = {password}
                className="text-sm bg-transparent w-full mr-3 mt-2 py-3.5 px-4 h-2 sm:bg-secondary border border-normal rounded-lg focus:outline-none focus:border-purple-900"
                onChange ={({target})=>setPassword(target.value)}
                />
                </label>

                <label className="flex flex-col mt-3"> Repeat Password
                <input 
                aria-label="Enter your password again"
                type="password" 
                value = {repeatpwd}
                className="text-sm bg-transparent w-full mr-3 mt-2 py-3.5 px-4 h-2 sm:bg-secondary border border-normal rounded-lg focus:outline-none focus:border-purple-900"
                onChange ={({target})=>setRepeatpwd(target.value)}
                />
                </label>

                <button
                type="submit" 
                className={`bg-button my-6 py-1.5 rounded-lg w-full ${!isInvalid && 'hover:bg-purple-900'} ${isInvalid && 'opacity-50'}`}
                disabled={isInvalid && true}>
                Sign up
                </button>
               </form>
           </div>
           <div className="flex flex-row">
            <Link to={ROUTES.LOGIN} className="cursor-pointer hover:underline mt-8 text-sm text-link">Login </Link>
           </div>
       </div>
    )
}