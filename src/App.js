import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import * as ROUTES from './constants/routes'
import AuthListener from "./hooks/AuthListener"
import UserContext from './context/user'

const Login = lazy(() => import ('./pages/Login'))
const Signup = lazy(() => import ('./pages/Signup'))
const NotFound = lazy(() => import ('./pages/NotFound'))
const Homepage = lazy(() => import ("./pages/Homepage"))

export default function App() {

  const {user} = AuthListener()

  return (
    /*use context to pass user logged in state to all children*/
    <UserContext.Provider value={{user}}>
    {/*use router to direct user to correct page*/}
   <Router>
     {/*use suspense to load this component while user is waitinf for requested page to load*/}
     <Suspense fallback={<h1>LOADING</h1>}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login/>} />
        <Route path={ROUTES.SIGN_UP} element={<Signup/>} />
        <Route path={ROUTES.HOMEPAGE} element={<Homepage/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
     </Suspense>
   </Router>
   </UserContext.Provider>
  )
}
