//use context to pass user logged in state to all children

import { createContext } from "react"

const UserContext = createContext(null)

export default UserContext