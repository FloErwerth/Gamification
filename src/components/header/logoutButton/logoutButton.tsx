import {SignOut} from "../../../../firebase";
import {useCallback} from "react";
import {useAppDispatch} from "../../../store/store";
import {setLoggedIn} from "../../../store/authentication/authActions";

export const LogoutButton = () => {
   const dispatch = useAppDispatch();
   const handleSignout = useCallback(() => {
      console.log("signout");
      SignOut().then(() => dispatch(setLoggedIn(false)));
   }, []);

   return <button onClick={handleSignout}>Signout</button>
}