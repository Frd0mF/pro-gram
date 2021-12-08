import {useRef} from 'react'
import PropTypes from 'prop-types'
import Header from './Header';
import Image from './Image'
import Actions from './Actions'
import Footer from './footer'
import Comments from './Comments';

export default function Post({content}) {

    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return(
        <div className="max-h-full rounded-sm mx-4 md:ml-4 col-span-4 border bg-primary border-normal mb-6">
            <Header username={content.username} caption={content.caption} />
            <Image src={content.imageSrc} caption={content.caption}/>
            <div className="flex">
            <Actions 
                docId={content.docId} 
                likes={content.likes.length} 
                likedPhoto={content.userLikedPhoto} 
                dislikes={content.dislikes} 
                dislikedPhoto={content.userDislikedPhoto}
                handleFocus={handleFocus} />
            <Footer caption={content.caption} />
            </div>
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput} />
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
      username: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      docId: PropTypes.string.isRequired,
      userLikedPhoto: PropTypes.bool.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      dateCreated: PropTypes.number.isRequired
    })
  };