import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {ActivityProps} from "./src/store/activities/types";

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

const firebaseDB = getFirestore(firebaseApp);
const getUserCollection = () => collection(firebaseDB, "Nutzerdaten");

export const addFirebaseUser = async (userId: string) => {
   const userCollection = getUserCollection();
   await setDoc(doc(userCollection, userId), {activities: {}}, {merge: true});
}
const getUserRef = (uid: string) => doc(firebaseDB, "Nutzerdaten", uid);

export const getStoredActivities = async (userId: string): Promise<ActivityProps[]> => {
   const userDoc = await getDoc(getUserRef(userId));
   if (userDoc.exists()) {
      return userDoc.data().activities as ActivityProps[];
   } else return []
}

type GeneratedObject<T> = { [index: number]: T };

function createObjectFromArray<T>(activities: T[]) {
   return activities.reduce<GeneratedObject<T>>((previousValue, currentValue, currentIndex) => {
      return {
         [currentIndex]: {...previousValue, ...currentValue}
      }
   }, {} as GeneratedObject<T>)
}

export const addActivityInDatabase = async (uid: string, currentActivites: ActivityProps[], activity: ActivityProps) => {
   const userRef = getUserRef(uid);
   await updateDoc(userRef, {activities: createObjectFromArray([...currentActivites, activity])});
}

export const updateActivitiesInDatabase = async (uid: string, activities: ActivityProps[]) => {
   const userRef = getUserRef(uid);
   await updateDoc(userRef, {activities: createObjectFromArray(activities)})
}
