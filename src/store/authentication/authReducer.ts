import {AuthenticationActions} from "./authActions";
import {InitialGamificiationState} from "../store";
import { GamificationActionTypes } from "../types";

export const authReducer = (oldAuthentication = InitialGamificiationState.authentication, action: AuthenticationActions) => {
   let authentication = oldAuthentication;
   switch (action.type) {
      case GamificationActionTypes.REGISTER:
         authentication = {...oldAuthentication, ...action.payload};
         break;
      case GamificationActionTypes.LOGIN:
         authentication = {...oldAuthentication, ...{loggedIn: action.payload.loggedIn ?? false}};
         break;
      case GamificationActionTypes.SET_EMAIL:
         authentication = {...oldAuthentication, ...{email: action.payload.email ?? oldAuthentication.email}}; break;
      case GamificationActionTypes.SET_USER_ID: authentication = {...oldAuthentication, ...{userId: action.payload.userId ?? oldAuthentication.userId}}
   }

   return authentication;
}