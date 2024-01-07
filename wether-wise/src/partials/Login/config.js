//import firebaseConfig from '../config'; 
import firebase from 'firebase'; 

const firebaseConfig = { 
	apiKey: "AIzaSyCP0D0mg6dYn2GayonAgppCZTlCMaus7ko",
  authDomain: "weather-wise-f8948.firebaseapp.com",
  databaseURL: "weather-wise-f8948-default-rtdb.firebaseio.com",
  projectId: "weather-wise-f8948",
  storageBucket: "weather-wise-f8948.appspot.com",
  messagingSenderId: "991255736095",
  appId: "1:991255736095:web:4cd03487b61b419a8f8a2a",
}; 

firebase.initializeApp(firebaseConfig); 
export const auth = firebase.auth();

