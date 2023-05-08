import {useCallback, useState} from "react";
import {Button} from "../../../basicComponents/Button/Button";
import {getClasses} from "../../../utils/styleUtils";
import {styles} from "./styles";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getIsLoggedIn} from "../../../store/authentication/authSelectors";
import {Modal} from "../../../basicComponents/Modal/Modal";
import {AuthenticationForm} from "../../../forms/Authentication/AuthenticationForm";
import {SignOut} from "../../../../firebase";
import {setLoggedIn} from "../../../store/authentication/authActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../../types/pages";

const cssClasses = getClasses(styles);

export const LoginToggle = () => {
   const loggedIn = useAppSelector(getIsLoggedIn);
   const [loginOpened, setLoginOpened] = useState(false);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleOpenLogin = useCallback(() => {
      setLoginOpened(true);
   }, [loginOpened])

   const handleLogout = useCallback(() => {
      SignOut().then(() => {
         navigate(Pages.HOME);
         dispatch(setLoggedIn(false));
      });
   }, []);

   if (loggedIn) {
      return <Button onClick={handleLogout}>Logout</Button>
   }

   if (!loggedIn) {
      return <><Button className={cssClasses.login} onClick={handleOpenLogin}>Login</Button>
         {loginOpened && <Modal open={loginOpened}
                                onClose={() => setLoginOpened(false)}><AuthenticationForm
             onActionDone={() => setLoginOpened(false)}/></Modal>}</>
   }

   return null;
};
