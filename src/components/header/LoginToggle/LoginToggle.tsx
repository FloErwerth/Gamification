import {useCallback, useState} from "react";
import {Button} from "../../Button/Button";
import {getClasses} from "../../../utils/styleUtils";
import {styles} from "./styles";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getIsLoggedIn} from "../../../store/authentication/authSelectors";
import {Modal} from "../../Modal/Modal";
import {AuthenticationForm} from "../../../forms/Authentication/AuthenticationForm";
import {SignOut} from "../../../../firebase";
import {setLoggedIn} from "../../../store/authentication/authActions";

interface LoginButtonProps {
   handleClick: () => void;
}

const cssClasses = getClasses(styles);

export const LoginToggle = ({handleClick}: LoginButtonProps) => {
   const loggedIn = useAppSelector(getIsLoggedIn);
   const [loginOpened, setLoginOpened] = useState(false);
   const dispatch = useAppDispatch();

   const handleOpenLogin = useCallback(() => {
      setLoginOpened(true);
   }, [loginOpened])

   const handleLogout = useCallback(() => {
      SignOut().then(() => dispatch(setLoggedIn(false)));
   }, []);

   if (loggedIn) {
      return <Button onClick={handleLogout}>Logout</Button>
   }

   if (!loggedIn) {
      return (
         <>
            <Button className={cssClasses.login} onClick={handleOpenLogin}>Login</Button>
            {loginOpened && <Modal open={loginOpened}
                                   onClose={() => setLoginOpened(false)}><AuthenticationForm
                onActionDone={() => setLoginOpened(false)}/></Modal>}
         </>
      );
   }

   return null;
};
