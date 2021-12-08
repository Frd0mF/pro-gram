import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from './post'

export default function Timeline () {

    const {photos} = usePhotos()

    return (
        <div className="container col-span-4 mx-auto mt-6 md:col-span-2">
            {!photos ? (
                <Skeleton className="mt-4" count={4} with={320} height={400} baseColor="#161B22" highlightColor="#0D1117"/>
            ) : photos?.length > 0 ? (
                photos.map((content) => 
                <Post key={content.docId} content={content} />)
            ) : (
                <p className="text-center text-2xl text-white">Follow people to see photos</p>
            )}
        </div>
    )
}