import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD4Nk1IRzxy9c6eV1kvIO6Z68ikpU9KjQI",
  authDomain: "message-clone-a5269.firebaseapp.com",
  projectId: "message-clone-a5269",
  storageBucket: "message-clone-a5269.appspot.com",
  messagingSenderId: "381644704552",
  appId: "1:381644704552:web:c5ce4b1d6e67c1294f9e1d",
  measurementId: "G-0RPNN58WP9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
