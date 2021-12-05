import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import * as ROUTES from './constants/routes'


const Login = lazy(()=> import ('./pages/Login'))

export default function App() {
  return (
   <Router>
     <Suspense fallback={<h1>LOADING</h1>}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login/>} />
      </Routes>
     </Suspense>
   </Router>
  )
}
