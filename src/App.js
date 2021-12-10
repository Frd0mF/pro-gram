import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import * as ROUTES from './constants/routes'
import AuthListener from "./hooks/AuthListener"
import UserContext from './context/user'
import ProtectedRoute from "./helpers/protected.route"
import isLoggedIn from "./helpers/isLoggedIn"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Login = lazy(() => import ('./pages/Login'))
const Signup = lazy(() => import ('./pages/Signup'))
const NotFound = lazy(() => import ('./pages/NotFound'))
const Profile = lazy(() => import ('./pages/Profile'))
const Homepage = lazy(() => import ("./pages/Homepage"))

export default function App() {

  const {user} = AuthListener()

  return (
    /*use context to pass user logged in state to all children*/
    <UserContext.Provider value={{user}}>
    {/*use router to direct user to correct page*/}
   <Router>
     {/*use suspense to load this component while user is waitinf for requested page to load*/}
     <Suspense fallback={<div className="bg-secondary flex justify-center items-center h-screen"><Loader
        type="Hearts"
        color="#673AB7"
        height={100}
        width={100}
        timeout={3000} //3 secs
      /></div>}>
      <Routes>
      <Route path={ROUTES.LOGIN} element={
            <isLoggedIn user={user}>
              <Login/>
              </isLoggedIn>} />
      <Route path={ROUTES.HOMEPAGE} element={
            <ProtectedRoute user={user}>
              <Homepage/>
            </ProtectedRoute>} />
        <Route path={ROUTES.SIGN_UP} element={<Signup/>} />
        <Route path={ROUTES.PROFILE} element={<Profile/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
     </Suspense>
   </Router>
   </UserContext.Provider>
  )
}
