import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function ProfileData({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
      profile: {},
      photosCollection: null,
      followerCount: 0
    };

    //save current state  
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
      reducer,
      initialState
    );
  
    useEffect(() => {
      async function getProfileInfoAndPhotos() {
        const photos = await getUserPhotosByUserId(user.userId);
        //asgin results
        dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
      }
      getProfileInfoAndPhotos();
    }, [user.username, user]);

    return (
      <>
        <Header
          photosCount={photosCollection ? photosCollection.length : 0}
          profile={profile}
          followerCount={followerCount}
          setFollowerCount={dispatch}
        />
        <Photos photos={photosCollection} />
      </>
    );
  }
  ProfileData.propTypes = {
    user: PropTypes.shape({
      dateCreated: PropTypes.number,
      emailAddress: PropTypes.string,
      followers: PropTypes.array,
      following: PropTypes.array,
      fullName: PropTypes.string,
      userId: PropTypes.string,
      username: PropTypes.string
    })
  };