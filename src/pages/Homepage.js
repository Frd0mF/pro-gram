import {useEffect} from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Sidebar from '../components/sidebar'
export default function Homepage () {
    useEffect(() => {
        document.title = 'ProGram'
    }, [])

    return (
        <div className="bg-background min-h-screen">
            <Header />
            <div className="flex flex-col-reverse md:grid md:grid-cols-3 md:gap-4 md:justify-between mx-auto max-w-screen-lg bg-secondary min-h-screen">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}