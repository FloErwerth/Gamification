import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";

const firebaseApp = initializeApp({
   apiKey: "AIzaSyDFK3fGAEFWRpdAhwC5FPE5beGcNDzAMXk",
   authDomain: "gamification-a0ec5.firebaseapp.com",
   projectId: "gamification-a0ec5",
   storageBucket: "gamification-a0ec5.appspot.com",
   messagingSenderId: "420514286189",
   appId: "1:420514286189:web:744622c8e5308431afcd64",
   measurementId: "G-3J89V7TW0M",
})

export const Auth = getAuth(firebaseApp);
export const Signup = (email: string, password: string) => createUserWithEmailAndPassword(Auth, email, password);
export const Signin = (email: string, password: string) => signInWithEmailAndPassword(Auth, email, password);
export const SignOut = () => signOut(Auth);
export default firebaseApp;