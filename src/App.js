import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import * as ROUTES from './constants/routes'


const Login = lazy(() => import ('./pages/Login'))
const Signup = lazy(() => import ('./pages/Signup'))

export default function App() {
  return (
    //use router to direct user to correct page
   <Router>
     {/*use suspense to load this component while user is waitinf for requested page to load*/}
     <Suspense fallback={<h1>LOADING</h1>}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login/>} />
        <Route path={ROUTES.SIGN_UP} element={<Signup/>} />
      </Routes>
     </Suspense>
   </Router>
  )
}
