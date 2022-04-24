import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwUUvN72Y5LmOmI6-pOEo91_w_0k4nSbs",
  authDomain: "desarollo-web-firebase.firebaseapp.com",
  projectId: "desarollo-web-firebase",
  storageBucket: "desarollo-web-firebase.appspot.com",
  messagingSenderId: "125745927157",
  appId: "1:125745927157:web:9e96c689f95591ef51c6bc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
