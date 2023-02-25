import {LoginIcon} from "../../../media/icons";
import {useCallback} from "react";
import {Button} from "../../basicComponents/Button/Button";
import {getClasses} from "../../../utils/styleUtils";
import {loginStyles} from "./loginStyles";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../../types/pages";

const cssClasses = getClasses(loginStyles);
export const LoginButton = () => {
   const navigate = useNavigate();
   const handleLogin = useCallback(() => {
      navigate(Pages.LOGIN)
   }, [])

   return <Button className={cssClasses.login} onClick={handleLogin}><LoginIcon
      className={cssClasses.icon}/> Login</Button>
}