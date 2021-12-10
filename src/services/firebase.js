//return a list of all users with the same username (either 1 result or 0 ideally)
import {firebase, FieldValue} from '../lib/firebase'

export async function doesUsernameExists(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    return result.docs.map((user) => user.data().length > 0)
}

//get user id
export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

        return result.docs.map((item) =>({
            ...item.data(),
            docId : item.id
        }))  
}

//get user data by searching the id (get followers,comments...)
export async function getUserByID(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get()

    const user = result.docs.map((item) =>({
        ...item.data(),
        docId : item.id
    }))  

    return user
}
//suggestions
export async function getSuggestedProfiles(userId,following) {
    //get 3 random profiles
    //const result = await firebase.firestore().collection('users').limit(5).get()
    //remove ur own profile and profiles u already following
    //const suggested = result.docs.map((user) => ({...user.data(), docId: user.id}))
    //    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
    
    //return suggested

    let query = firebase.firestore().collection('users');

    if (following.length > 0) {
      query = query.where('userId', 'not-in', [...following, userId]);
    } else {
      query = query.where('userId', '!=', userId)
    }
    const result = await query.limit(10).get();
  
    const profiles = result.docs.map((user) => ({
      ...user.data(),
      docId: user.id
    }));
    return profiles;
}


//update logged in user followers
export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id 
    profileId, // the user that XX requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
    ) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile ?
            FieldValue.arrayRemove(profileId) :
            FieldValue.arrayUnion(profileId)
        });
      }
//update followed user followers
export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (karl's profile)
    loggedInUserDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
    ) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile ?
            FieldValue.arrayRemove(loggedInUserDocId) :
            FieldValue.arrayUnion(loggedInUserDocId)
        });
      }

//get user photos
export async function getPhotos(userId, following) {
    //get all photos where user id equals the id of people im followinng
    const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get()

    //map each photo to an array
    const userFollowedPhotos = result.docs.map((photos) => ({
        ...photos.data(),
        docId: photos.id
    }))


    const photosWithUserDetails = await Promise.all(
        //get photos that I liked
         userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false
            let userDislikedPhoto = false
            //set photo to either be liked or disliked
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
                userDislikedPhoto = false
            }
            if (photo.dislikes.includes(userId)) {
                userLikedPhoto = false
                userDislikedPhoto = true
            }

            //get username
            const user = await getUserByID(photo.userId)
            const {username} = user[0]
            return { username, ...photo, userLikedPhoto, userDislikedPhoto}
        })
    )
    return photosWithUserDetails
}

//get user photos by id
export async function getUserPhotosByUserId(userId) {
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get();
      console.log(result.docs)
    const photos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
    console.log(photos)
    return photos;
}

export async function isUerFollowingProfile(loggedInUsername, profileUserId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
    return response.userId
}
  
export async function toggleFollow(isFollowing, activeUserDocId, profileDocId, profileUserId, followingUserId) {
    //currently logged in user
    //the followed user id
    //is the logged in user already following the other user
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowing)
    //logged in user
    //the requested follow
    //is the logged in user already following the other user
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowing)
}