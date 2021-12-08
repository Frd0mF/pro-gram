import {useState, useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'

export default function Login() {
    //get navigation
    const navigate = useNavigate()
    //get firebase context
    const {firebase} = useContext(FirebaseContext)

    const [emailAdress, setEmailAdress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = emailAdress === '' || password === ''
    //handle loging
    const loginHandler = async (event) => {
        event.preventDefault()
        if (password.length < 7){
            setError ('Password should be more than 8 characters long')
            setPassword('')
        }
        else{
            try {
                //login in user to firebase
                await firebase.auth().signInWithEmailAndPassword(emailAdress,password)
                //redirect to homepage
                navigate(ROUTES.HOMEPAGE)
            } catch (error) {
                setEmailAdress('')
                setPassword('')
                setError(error.message)
            }
        }
    }

    useEffect (()=>{
        document.title = 'Login - ProGram'
    },[])

    return(
       <div className="flex text-white font-sans font-light flex-col h-screen bg-primary sm:bg-secondary items-center">
           <img className="w-16 mt-6" src="./images/favicon.png" alt="logo"/>
           <h1 className="mt-4 text-2xl">Sign in to ProGram</h1>
           <div className="flex flex-col mt-6 w-80 border border-normal rounded-md">
               <form className="pt-4 px-5 text-sm sm:bg-primary" onSubmit={loginHandler} method="POST">
               {error && <p className="mb-4 text-sm text-red-500"> {error} </p>}
                <label className="flex flex-col"> Email address
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
                <button
                type="submit" 
                className={`bg-button my-6 py-1.5 rounded-lg w-full ${!isInvalid && 'hover:bg-purple-900'} ${isInvalid && 'opacity-50'}`}
                disabled={isInvalid && true}>
                Sign in
                </button>
               </form>
           </div>
           <div className="flex flex-row">
            <Link to={ROUTES.SIGN_UP} className="cursor-pointer hover:underline mt-8 text-sm text-link">Create an account </Link>
           </div>
       </div>
    )
}