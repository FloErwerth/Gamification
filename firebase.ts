import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {StatsProps} from "./src/store/activities/types";

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
const getSpecificUserCollection = (uid: string) => collection(firebaseDB, "Nutzerdaten", `${uid}/activities`);

export const addFirebaseUser = async (userId: string) => {
   const userCollection = getUserCollection();
   await setDoc(doc(userCollection, userId), {activities: []}, {merge: true});
}
const getActivitiesRef = (uid: string) => doc(firebaseDB, "Nutzerdaten", uid);
export const getStoredActivities = async (userId: string): Promise<StatsProps[]> => {
   const doc = await getDoc(getActivitiesRef(userId));
   if (doc.exists()) {
      return doc.data().activities as StatsProps[];
   } else return []
}

export const addActivityInDatabase = async (uid: string, data: StatsProps) => {
   const activityRef = getActivitiesRef(uid);
   await updateDoc(activityRef, {activities: arrayUnion({...data})});
}

export const updateActivitiesInDatabase = async (uid: string, activities: StatsProps[]) => {
   const activityRef = getActivitiesRef(uid);
   await updateDoc(activityRef, {activities})
}

