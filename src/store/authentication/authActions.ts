import {SignOut, Signup} from "../../../firebase";
import {GamificationActionTypes} from "../actions";
import {GamificationModel} from "../types";
import {DateType} from "../activities/types";

export type AuthenticationActions =
   { type: GamificationActionTypes.LOGIN, payload: boolean }
   | { type: GamificationActionTypes.SET_USER_ID, payload: string }
   | { type: GamificationActionTypes.SET_CREATION_DATE, payload: string }
   | { type: GamificationActionTypes.SET_EMAIL, payload: string }
   | { type: GamificationActionTypes.SET_STAY_LOGGED_IN, payload: boolean }
   | { type: GamificationActionTypes.REGISTER, payload: GamificationModel["authentication"] }

export const setLoggedIn = (payload: boolean) => {
   return {
      type: GamificationActionTypes.LOGIN,
      payload
   }
}

export const setUserId = (payload: string) => {
   return {
      type: GamificationActionTypes.SET_USER_ID,
      payload
   }
}

export const setCreationTime = (payload: DateType) => {
   return {
      type: GamificationActionTypes.SET_CREATION_DATE,
      payload
   }
}

export const setEmailAction = (payload: string) => {
   return {
      type: GamificationActionTypes.SET_EMAIL,
      payload
   }
}

export const setStayLoggedIn = (payload: boolean) => {
   return {
      type: GamificationActionTypes.SET_STAY_LOGGED_IN,
      payload
   }
}

export const logoutAction = async () => {
   SignOut().then(() => {
      return {
         type: GamificationActionTypes.LOGIN, payload: false
      }
   })
}

export const signupAction = async (email: string, password: string) => {
   try {
      const signup = await Signup(email, password);
      return {type: GamificationActionTypes.LOGIN, payload: {loggedIn: Boolean(signup.user.email)}};
   } catch (e) {
      console.log("error: cannot signup");
   }
}