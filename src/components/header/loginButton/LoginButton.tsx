import { LoginIcon } from "../../../media/icons";
import { useCallback, useMemo } from "react";
import { Button } from "../../basicComponents/Button/Button";
import { getClasses } from "../../../utils/styleUtils";
import { loginStyles } from "./loginStyles";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../../types/pages";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getIsLoggedIn } from "../../../store/authentication/authSelectors";
import { SignOut } from "../../../../firebase";
import { setLoggedIn } from "../../../store/authentication/authActions";

export const LoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(getIsLoggedIn);
  const cssClasses = getClasses(loginStyles(loggedIn));
  const text = useMemo(() => (loggedIn ? "Logout" : "Login"), [loggedIn]);
  const handleLogout = useCallback(() => {
    SignOut().then(() => dispatch(setLoggedIn(false)));
  }, []);
  const handleClick = useCallback(() => {
    loggedIn ? handleLogout() : navigate(Pages.LOGIN);
  }, [handleLogout]);

  return (
    <Button className={cssClasses.login} onClick={handleClick}>
      <LoginIcon className={cssClasses.icon} /> {text}
    </Button>
  );
};
