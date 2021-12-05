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