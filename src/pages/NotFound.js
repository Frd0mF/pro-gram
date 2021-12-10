import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as ROUTES from '../constants/routes'


export default function NotFound () {

    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Not Found'
    }, [])


    function goToHomePage() {
        navigate(ROUTES.HOMEPAGE)
    }

    return(
        <div className="bg-primary flex flex-col items-center h-screen pt-20">
            <img className="w-48" src="/images/not_found/not_found.png" alt="page not found" />
            <h1 className="text-white mt-12 text-3xl">Page not found</h1>
            <img className="mx-auto mt-12" src="/images/not_found/travolta.gif" alt="travolta gif" />
            <button
                className="bg-button text-icon my-6 rounded-lg px-4 py-2 hover:bg-purple-900"
                onClick={goToHomePage}>
                Go to Homepage  
                </button>
        </div>
    )
}