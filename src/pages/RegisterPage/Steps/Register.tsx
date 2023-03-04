import { Input } from "../../../components/basicComponents/Input/Input";
import { Button } from "../../../components/basicComponents/Button/Button";
import { getClasses } from "../../../utils/styleUtils";
import { registerStyles } from "./registerStyles";
import { useCallback, useMemo, useState } from "react";
import { SafeParseReturnType, z } from "zod";
import { addFirebaseUser, Signup } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../../types/pages";
import { useAppDispatch } from "../../../store/store";
import {
  setEmailAction,
  setLoggedIn,
  setUserId,
} from "../../../store/authentication/authActions";

const cssClasses = getClasses(registerStyles);

const passwordValidation = z
  .string()
  .min(8, "Enter at least 8 characters")
  .regex(new RegExp("[A-Z]"), "The password must contain an uppercase letter")
  .regex(
    new RegExp("[$&+,:;=?@#|'<>.^*()%!-]"),
    "The password must contain at least one special character"
  );

const emailValidation = z.string().email();

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [secondPasswordValidationResult, setSecondPasswordValidationResult] =
    useState<SafeParseReturnType<string, string> | undefined>(undefined);
  const [passwordValidationResult, setpasswordValidationResult] = useState<
    SafeParseReturnType<string, string> | undefined
  >(undefined);
  const [emailValidationResult, setEmailValidationResult] = useState<
    SafeParseReturnType<string, string> | undefined
  >(undefined);
  const secondPasswordValidation = useMemo(
    () =>
      z
        .string()
        .regex(
          new RegExp(password),
          "The second password must match the first password"
        ),
    [password]
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setpasswordValidationResult(passwordValidation.safeParse(value));
  }, []);

  const handleSecondPasswordChange = useCallback((value: string) => {
    setSecondPassword(value);
    setSecondPasswordValidationResult(
      secondPasswordValidation.safeParse(value)
    );
  }, []);

  const handleRegister = useCallback(async () => {
    const emailValidationResult = emailValidation.safeParse(email);
    setEmailValidationResult(emailValidationResult);

    if (!emailValidationResult.success) {
      return;
    }

    const passwordValidationResult = passwordValidation.safeParse(password);
    setpasswordValidationResult(passwordValidationResult);

    if (!passwordValidationResult.success) {
      return;
    }

    const secondPasswordValidationResult =
      secondPasswordValidation.safeParse(secondPassword);
    setSecondPasswordValidationResult(secondPasswordValidationResult);
    if (!secondPasswordValidationResult.success) {
      return;
    }

    const signupResult = await Signup(email, password);
    if (signupResult.user.email) {
      dispatch(setEmailAction(email));
      dispatch(setLoggedIn(true));
      dispatch(setUserId(signupResult.user.uid));
      addFirebaseUser(signupResult.user.uid).then(() => {
        navigate(Pages.OVERVIEW);
      });
    }
  }, [password, secondPassword]);

  return (
    <>
      <div className={cssClasses.title}>Register</div>
      <div className={cssClasses.inputWrapper}>
        <Input
          validationResult={emailValidationResult}
          onChange={(value) => setEmail(value)}
          value={email}
          label={"Email"}
          id="email"
          type={"email"}
        />

        <Input
          validationResult={passwordValidationResult}
          onChange={handlePasswordChange}
          value={password}
          label={"Password"}
          id="password"
          type={"password"}
        />

        <Input
          validationResult={secondPasswordValidationResult}
          onChange={handleSecondPasswordChange}
          value={secondPassword}
          label={"Repeat Password"}
          id="secondPassword"
          type={"password"}
        />
      </div>
      <Button className={cssClasses.loginButton} onClick={handleRegister}>
        Register
      </Button>
    </>
  );
};
