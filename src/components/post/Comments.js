import {useState} from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import AddComment from './AddComment'

export default function Comments ({ docId, comments, posted, commentInput }) {

    const [allComments, setAllComments] = useState(comments)

    return(
        <>
         <div className="p-4 pt-0 pb-4 text-icon">
            {allComments.length >= 3 && (
                <p className="text-sm text-icon mb-1 cursor-pointer">
                    View all {allComments.length} comments
                </p>
            )}
            {allComments.slice(allComments.length - 3, allComments.length).map((item) => (
                <p key={`${item.commet}-${item.displayName}`}>
                    <Link to={`/u/${item.displayName}`}>
                        <span className="mr-1 font-bold">
                            {item.displayName}
                        </span>
                    </Link>
                    <span>{item.comment}</span>
                </p>
            ))}
            <p className="text-icon uppercase text-xs mt-2">
                {formatDistance(posted, new Date())} ago
        </p>
        </div>
        <AddComment 
            docId={docId}
            comments={allComments}
            setAllComments={setAllComments}
            commentInput={commentInput}
            />
        </>
    )
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
  };