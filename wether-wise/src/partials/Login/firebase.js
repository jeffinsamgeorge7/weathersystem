import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCP0D0mg6dYn2GayonAgppCZTlCMaus7ko",
    authDomain: "weather-wise-f8948.firebaseapp.com",
    databaseURL: "weather-wise-f8948-default-rtdb.firebaseio.com",
    projectId: "weather-wise-f8948",
    storageBucket: "weather-wise-f8948.appspot.com",
    messagingSenderId: "991255736095",
    appId: "1:991255736095:web:4cd03487b61b419a8f8a2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const gb = getFirestore(app);
const database=getAuth(app)
const auth = getAuth(app)
export {app ,gb,database ,auth};
