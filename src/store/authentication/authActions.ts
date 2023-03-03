import {AUTHENTICATION_ACTION_TYPE, AUTHENTICATION_ACTION_TYPES} from "./types";
import {SignOut, Signup} from "../../../firebase";

type AuthPayload = { loggedIn?: boolean, email?: string }
type AuthAction = { type: AUTHENTICATION_ACTION_TYPES, payload: AuthPayload }

export type AuthenticationActions = AuthAction;

export const setLoggedIn = (loggedIn: boolean): AuthAction => {
   return {
      type: AUTHENTICATION_ACTION_TYPE.Enum.LOGIN,
      payload: {loggedIn}
   }
}


export const setEmailAction = (email: string): AuthAction => {
   return {
      type: AUTHENTICATION_ACTION_TYPE.Enum.SET_EMAIL,
      payload: {email}
   }
}

export const logoutAction = async () => {
   SignOut().then(() => {
      return {
         type: AUTHENTICATION_ACTION_TYPE.Enum.LOGIN, payload: {loggedIn: false}
      }
   })
}

export const signupAction = async (email: string, password: string) => {
   try {
      const signup = await Signup(email, password);
      return {type: AUTHENTICATION_ACTION_TYPE.Enum.LOGIN, payload: {loggedIn: Boolean(signup.user.email)}};
   } catch (e) {
      console.log("error: cannot signup");
   }
}