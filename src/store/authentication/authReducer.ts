import {AuthenticationActions, AuthenticationActionType} from "./authActions";
import {InitialGamificiationState} from "../store";
import produce from "immer";

export const authReducer = (oldAuthentication = InitialGamificiationState.authentication, action: AuthenticationActions) => {
   switch (action.type) {
      case AuthenticationActionType.REGISTER:
         return produce(oldAuthentication, () => {
            action.payload;
         })
      case AuthenticationActionType.LOGIN:
         return produce(oldAuthentication, newAuth => {
            newAuth.loggedIn = action.payload
         })
      case AuthenticationActionType.SET_EMAIL:
         return produce(oldAuthentication, newAuth => {
            newAuth.email = action.payload;
         })
      case AuthenticationActionType.SET_USER_ID:
         return produce(oldAuthentication, newAuth => {
            newAuth.userId = action.payload;
         })
      case AuthenticationActionType.SET_STAY_LOGGED_IN:
         return produce(oldAuthentication, newAuth => {
            newAuth.stayLoggedIn = action.payload;
         })
      case AuthenticationActionType.SET_CREATION_DATE:
         return produce(oldAuthentication, newAuth => {
            newAuth.creationDate = action.payload;
         })
      default:
         return oldAuthentication;
   }
}