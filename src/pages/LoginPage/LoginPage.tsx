import { useCallback, useState } from "react";
import { getClasses } from "../../utils/styleUtils";
import { loginStyles } from "./loginStyles";
import { Input } from "../../components/basicComponents/Input/Input";
import { Button } from "../../components/basicComponents/Button/Button";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../types/pages";
import { FormWrapper } from "../../components/basicComponents/FormWrapper/FormWrapper";
import {
  setEmailAction,
  setLoggedIn,
  setStayLoggedIn,
  setUserId,
} from "../../store/authentication/authActions";
import { useAppDispatch } from "../../store/store";
import { getStoredActivities, Signin } from "../../../firebase";
import { setActivities } from "../../store/activities/activitiesActions";
import { Checkmark } from "../../components/basicComponents/Checkmark/Checkmark";

const cssClasses = getClasses(loginStyles);

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(async () => {
    const user = await Signin(email, password);
    const loggedIn = Boolean(user.user.email);
    dispatch(setLoggedIn(loggedIn));
    dispatch(setUserId(user.user.uid));

    const storedActivities = await getStoredActivities(user.user.uid);
    if (storedActivities) {
      dispatch(setActivities(storedActivities));
    }

    if (Boolean(user.user.email) && user.user.email) {
      dispatch(setEmailAction(user.user.email));
      navigate(Pages.OVERVIEW);
    }
  }, [email, password]);

  const handleStayLoggedIn = useCallback((value: boolean) => {
    dispatch(setStayLoggedIn(value));
  }, []);

  return (
    <FormWrapper>
      <div className={cssClasses.title}>Login</div>
      <div className={cssClasses.inputWrapper}>
        <Input
          onChange={(value) => setEmail(value)}
          value={email}
          label={"Email"}
          id="email"
          type={"email"}
        />

        <Input
          onChange={(value) => setPassword(value)}
          value={password}
          label={"Password"}
          id="password"
          type={"password"}
        />

        <Checkmark label="Stay logged in" onToggle={handleStayLoggedIn} />
      </div>
      <div className={cssClasses.buttonWrapper}>
        <Button className={cssClasses.loginButton} onClick={handleLogin}>
          Login
        </Button>
        <button
          className={cssClasses.registerLink}
          onClick={() => navigate(Pages.REGISTER)}
        >
          Have no account yet? Click here to create one
        </button>
      </div>
    </FormWrapper>
  );
};
