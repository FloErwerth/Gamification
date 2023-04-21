import {Signup} from "../../../firebase";
import {GamificationModel} from "../types";
import {DateType} from "../activities/types";
import {generateAction} from "../utils";

export enum AuthenticationActionType {
   REGISTER = "gamification/authentication/register",
   LOGIN = "gamification/authentication/login",
   SET_CREATION_DATE = "gamification/authentication/creation_date",
   SET_USER_ID = "gamification/authentication/user_id",
   SET_EMAIL = "gamification/authentication/set_email",
   SET_STAY_LOGGED_IN = "gamification/authentication/set_logged_in",
}

export type AuthenticationActions =
   { type: AuthenticationActionType.LOGIN, payload: boolean }
   | { type: AuthenticationActionType.SET_USER_ID, payload: string }
   | { type: AuthenticationActionType.SET_CREATION_DATE, payload: DateType }
   | { type: AuthenticationActionType.SET_EMAIL, payload: string }
   | { type: AuthenticationActionType.SET_STAY_LOGGED_IN, payload: boolean }
   | { type: AuthenticationActionType.REGISTER, payload: GamificationModel["authentication"] }

export const setLoggedIn = (payload: boolean) => {
   return generateAction(AuthenticationActionType.LOGIN, payload);
}

export const setUserId = (payload: string) => {
   return generateAction(AuthenticationActionType.SET_USER_ID, payload);
}

export const setCreationTime = (payload: DateType) => {
   return generateAction(AuthenticationActionType.SET_CREATION_DATE, payload);
}

export const setEmailAction = (payload: string) => {
   return generateAction(AuthenticationActionType.SET_EMAIL, payload);
}

export const setStayLoggedIn = (payload: boolean) => {
   return generateAction(AuthenticationActionType.SET_STAY_LOGGED_IN, payload);
}

export const logoutAction = async () => {
   return generateAction(AuthenticationActionType.LOGIN, false);
}

export const signupAction = async (email: string, password: string) => {
   try {
      const signup = await Signup(email, password);
      return generateAction(AuthenticationActionType.LOGIN, {loggedIn: Boolean(signup.user.email)});
   } catch (e) {
      console.log("error: cannot signup");
   }
}