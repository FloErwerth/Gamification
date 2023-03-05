import { LoginIcon } from "../../../media/icons";
import { useCallback, useMemo } from "react";
import { Button } from "../../basicComponents/Button/Button";
import { getClasses } from "../../../utils/styleUtils";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../../types/pages";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getIsLoggedIn } from "../../../store/authentication/authSelectors";
import { SignOut } from "../../../../firebase";
import { setLoggedIn } from "../../../store/authentication/authActions";

interface LoginButtonProps {
  handleClick: () => void;
}

export const LoginToggle = ({ handleClick }: LoginButtonProps) => {
  const loggedIn = useAppSelector(getIsLoggedIn);
  const cssClasses = getClasses(styles(loggedIn));
  const text = useMemo(() => (loggedIn ? "Logout" : "Login"), [loggedIn]);

  return (
    <Button className={cssClasses.login} onClick={handleClick}>
      <LoginIcon className={cssClasses.icon} /> {text}
    </Button>
  );
};
