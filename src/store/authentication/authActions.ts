import {SignOut, Signup} from "../../../firebase";
import { GamificationActionTypes } from "../types";

type AuthPayload = { userId?: string, loggedIn?: boolean, email?: string }
type AuthAction = { type: GamificationActionTypes, payload: AuthPayload }

export type AuthenticationActions = AuthAction;

export const setLoggedIn = (loggedIn: boolean): AuthAction => {
   return {
      type: GamificationActionTypes.LOGIN,
      payload: {loggedIn}
   }
}

export const setUserId = (userId: string): AuthAction => {
   return {
      type: GamificationActionTypes.SET_USER_ID,
      payload: {userId}
   }
}

export const setEmailAction = (email: string): AuthAction => {
   return {
      type: GamificationActionTypes.SET_EMAIL,
      payload: {email}
   }
}

export const logoutAction = async () => {
   SignOut().then(() => {
      return {
         type: GamificationActionTypes.LOGIN, payload: {loggedIn: false}
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