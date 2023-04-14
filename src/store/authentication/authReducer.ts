import {AuthenticationActions} from "./authActions";
import {InitialGamificiationState} from "../store";
import produce from "immer";
import {GamificationActionTypes} from "../actions";

export const authReducer = (oldAuthentication = InitialGamificiationState.authentication, action: AuthenticationActions) => {
   switch (action.type) {
      case GamificationActionTypes.REGISTER:
         return produce(oldAuthentication, () => {
            action.payload;
         })
      case GamificationActionTypes.LOGIN:
         return produce(oldAuthentication, newAuth => {
            newAuth.loggedIn = action.payload
         })
      case GamificationActionTypes.SET_EMAIL:
         return produce(oldAuthentication, newAuth => {
            newAuth.email = action.payload;
         })
      case GamificationActionTypes.SET_USER_ID:
         return produce(oldAuthentication, newAuth => {
            newAuth.userId = action.payload;
         })
      case GamificationActionTypes.SET_STAY_LOGGED_IN:
         return produce(oldAuthentication, newAuth => {
            newAuth.stayLoggedIn = action.payload;
         })
      case GamificationActionTypes.SET_CREATION_DATE:
         return produce(oldAuthentication, newAuth => {
            newAuth.creationDate = action.payload;
         })
      default:
         return oldAuthentication;
   }
}