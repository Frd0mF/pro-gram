import {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

export default function Actions({docId, likedPhoto, dislikedPhoto, handleFocus  }) {
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext)

    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [toggleDisliked, setToggleDisliked] = useState(dislikedPhoto)
    const [likes, setLikes] = useState(likedPhoto)
    const [dislikes, setDislikes] = useState(dislikedPhoto)
    const { firebase, FieldValue} = useContext(FirebaseContext)

    //handdle likes
    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked)
        setToggleDisliked(false)

        await firebase.firestore().collection('photos').doc(docId).update({
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId),
            dislikes: toggleDisliked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        })

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
        setDislikes((dislikes) => (toggleDisliked ? dislikes - 1 : dislikes))
    }
    
    //handle dislikes
    const handleToggledisliked = async () => {
        setToggleDisliked((toggleDisliked) => !toggleDisliked)
        setToggleLiked(false)

        await firebase.firestore().collection('photos').doc(docId).update({
            dislikes: toggleDisliked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId),
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        })

        setDislikes((dislikes) => (toggleDisliked ? dislikes - 1 : dislikes + 1))
        setLikes((likes) => (toggleLiked ? likes - 1 : likes))
    }


    return (
        <>
        <div className="flex justify-between py-4 p-2">
          <div className="flex">
            <svg 
                onClick={handleToggleLiked}
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-7 w-8 cursor-pointer ${
                    toggleLiked ? 'text-purple-900' : 'text-icon'
                  }`}
                viewBox="0 0 20 20"
                fill="currentColor">
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414
                    0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 
                    0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 
                    9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>

            <div className="px-1">
                <p className={`font-bold ${toggleLiked ? 'text-purple-900' : 'text-icon'}`}>{+likes}</p>
            </div>

            <svg 
                onClick={handleToggledisliked}
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-7 w-8 cursor-pointer ${
                    toggleDisliked ? 'text-red-900' : 'text-icon'
                  }`}
                viewBox="0 0 20 20" 
                fill="currentColor">
                <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 
                    0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 
                    0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1
                    1 0 011.414 0z" clipRule="evenodd" />
            </svg>

            <div className="px-1">
                <p className={`font-bold ${toggleDisliked ? 'text-red-900' : 'text-icon'}`}>{+dislikes}</p>
            </div>
            
            <svg 
                onClick={handleFocus}
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-2 h-7 w-8 cursor-pointer text-icon"
                viewBox="0 0 20 20" 
                fill="currentColor">
                <path fillRule="evenodd" 
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 
                    8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>

          </div>

        </div>
      </>
    )
}


Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
  };