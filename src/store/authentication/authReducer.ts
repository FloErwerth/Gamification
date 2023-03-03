import {AuthenticationActions} from "./authActions";
import {InitialGamificiationState} from "../store";

export const authReducer = (oldAuthentication = InitialGamificiationState.authentication, action: AuthenticationActions) => {
   let authentication = oldAuthentication;
   switch (action.type) {
      case "REGISTER":
         authentication = {...oldAuthentication, ...action.payload};
         break;
      case "LOGIN":
         authentication = {...oldAuthentication, ...{loggedIn: action.payload.loggedIn ?? false}};
         break;
      case "SET_EMAIL":
         authentication = {...oldAuthentication, ...{email: action.payload.email ?? oldAuthentication.email}}
   }

   return authentication;
}