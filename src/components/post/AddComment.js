import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

export default function AddComment({ docId, comments, setAllComments, commentInput }) {
  const [comment, setComment] = useState('')
  const { firebase, FieldValue } = useContext(FirebaseContext)
  const {
    user: { displayName }
  } = useContext(UserContext)

  const handleSubmitComment = (event) => {
    event.preventDefault()

    setAllComments([ ...comments, {displayName, comment }])
    setComment('')

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      })
  }

  return (
    <div className="border border-gray-800 rounded-sm ml-2 mb-2 mx-2">
      <form
        className="flex justify-between pl-0"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-icon bg-primary w-full mr-3 py-3 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm mx-2 my-1 pr-2 font-bold text-icon ${!comment && 'opacity-50'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}
AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
  }