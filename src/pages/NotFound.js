import { useEffect } from "react"

export default function NotFound () {

    useEffect(() => {
        document.title = 'Not Found'
    }, [])

    return(
        <div className="bg-primary flex flex-col items-center h-screen pt-20">
            <img className="w-48" src="/images/not_found/not_found.png" alt="page not found" />
            <h1 className="text-white mt-12 text-3xl">Page not found</h1>
            <img className="m-auto mt-12" src="/images/not_found/travolta.gif" alt="travolta gif" />
        </div>
    )
}