import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {deleteField, doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {ActivityProps, CellInfo, DateType} from "./src/store/activities/types";
import {Badge, BadgeId} from "./src/store/badges/types";

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

export const addFirebaseUser = async (userId: string) => {
   const activtiesRef = getActivitiesRef(userId);
   await setDoc(activtiesRef, {});
}
const getActivitiesRef = (uid: string) => doc(firebaseDB, `Nutzerdaten/${uid}/data/activities`);
const getOverallBadgesRef = (uid: string) => doc(firebaseDB, `Nutzerdaten/${uid}/data/overallBadges`)

export const getStoredActivities = async (userId: string): Promise<ActivityProps[]> => {
   const userDoc = await getDoc(getActivitiesRef(userId));
   if (userDoc.exists()) {
      return Object.values(userDoc.data()) as ActivityProps[];
   } else return []
}

type GeneratedObject<T> = { [index: number]: T };

function createObjectFromArray<T>(array: T[]) {
   let newObject: GeneratedObject<T> = {};
   array.forEach((arrayEntry, index) => newObject[index] = arrayEntry);
   return newObject;
}

export const addActivityInDatabase = async (uid: string, currentActivites: ActivityProps[], activity: ActivityProps) => {
   const activtiesRef = getActivitiesRef(uid);
   await setDoc(activtiesRef, createObjectFromArray([...currentActivites, activity]));
}

export const updateActivitiesInDatabase = async (uid: string, activities: ActivityProps[]) => {
   const activtiesRef = getActivitiesRef(uid);
   await setDoc(activtiesRef, createObjectFromArray(activities));
}

export const updateActivityCell = (uid: string, activityIndex: number, date: DateType, content: CellInfo) => {
   const ref = getActivitiesRef(uid);
   Promise.resolve(setDoc(ref, {
      [activityIndex]: {
         calendarEntries: {[date]: content}
      },
   }, {merge: true}));
}
export const deleteActivityCell = (uid: string, activityIndex: number, date: DateType) => {
   const ref = getActivitiesRef(uid);
   Promise.resolve(setDoc(ref, {
      [activityIndex]: {
         calendarEntries: {[date]: deleteField()}
      },
   }, {merge: true}));
}

export const addOverallBadgeInDatabase = (uid: string, badgeId: BadgeId) => {
   const overallBadgesRef = getOverallBadgesRef(uid);
   Promise.resolve(setDoc(overallBadgesRef, {badges: {[badgeId]: badgeId}}, {merge: true, mergeFields: ["/badges"]}));
}

export const removeOverallBadgeInDatabase = (uid: string, badgeId: Badge["id"]) => {
   const overallBadgesRef = getOverallBadgesRef(uid);
   Promise.resolve(setDoc(overallBadgesRef, {
      [badgeId]: deleteField()
   }))
}
