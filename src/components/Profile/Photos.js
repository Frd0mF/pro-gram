/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Photos({ photos }) {
  return (
    <div className="bg-secondary mt-12 px-4 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 pb-4 mb-12">
        {!photos
          ? new Array(12).fill(0).map((_, i) => <Skeleton baseColor="#161B22" highlightColor="#0D1117" key={i} width={320} height={400} />)
          : photos.length > 0
          ? photos.map((photo) => (
              <div key={photo.docId}>
                <img className="sm:h-96" src={photo.imageSrc} alt={photo.caption} />
                <div className="mt-2 flex">
                  <p className="flex items-center text-icon font-bold mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>

                  <p className="flex items-center text-icon font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>

      {!photos || (photos.length === 0 && <p className="text-center text-icon text-2xl pb-24">No Posts Yet</p>)}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array
};