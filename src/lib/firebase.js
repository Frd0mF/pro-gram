//import and set up firebase

import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAW6sFQ8NMlycJ100ChChbPsD1ce5tw_eA",
    authDomain: "program-007.firebaseapp.com",
    projectId: "program-007",
    storageBucket: "program-007.appspot.com",
    messagingSenderId: "602113791694",
    appId: "1:602113791694:web:0ed2dcd1fecdc887d1e29f"
}

const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore



export {firebase, FieldValue}