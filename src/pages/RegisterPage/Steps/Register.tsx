import {Input} from "../../../components/basicComponents/Input/Input";
import {Button} from "../../../components/basicComponents/Button/Button";
import {getClasses} from "../../../utils/styleUtils";
import {registerStyles} from "./registerStyles";
import {useCallback, useMemo, useState} from "react";
import {SafeParseReturnType, z} from "zod";

const cssClasses = getClasses(registerStyles);

const passwordValidation = z.string().min(8, "Enter at least 8 characters")
   .regex(new RegExp("[A-Z]"), "The password must contain an uppercase letter")
   .regex(new RegExp("[$&+,:;=?@#|'<>.^*()%!-]"), "The password must contain at least one special character");

const emailValidation = z.string().email();

export const Register = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [secondPassword, setSecondPassword] = useState("");
   const [secondPasswordValidationResult, setSecondPasswordValidationResult] = useState<SafeParseReturnType<string, string> | undefined>(undefined);
   const [passwordValidationResult, setpasswordValidationResult] = useState<SafeParseReturnType<string, string> | undefined>(undefined);
   const [emailValidationResult, setEmailValidationResult] = useState<SafeParseReturnType<string, string> | undefined>(undefined);
   const secondPasswordValidation = useMemo(() => z.string().regex(new RegExp(password), "The second password must match the first password"), [password]);

   const handlePasswordChange = useCallback((value: string) => {
      setPassword(value);
      setpasswordValidationResult(passwordValidation.safeParse(value));
   }, []);

   const handleSecondPasswordChange = useCallback((value: string) => {
      setSecondPassword(value);
      setSecondPasswordValidationResult(secondPasswordValidation.safeParse(value));
   }, []);

   const handleRegister = useCallback(() => {

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

      const secondPasswordValidationResult = secondPasswordValidation.safeParse(secondPassword);
      setSecondPasswordValidationResult(secondPasswordValidationResult);
      if (!secondPasswordValidationResult.success) {
         return;
      }

      console.log("redirect");
   }, [password, secondPassword])

   return <>
      <div className={cssClasses.title}>Register</div>
      <div className={cssClasses.inputWrapper}>
         <Input onChange={(value) => setName(value)} value={name}
                label={"Display Name"}
                id="name"
                type={"text"}/>

         <Input validationResult={emailValidationResult} onChange={(value) => setEmail(value)} value={email}
                label={"Email"}
                id="email"
                type={"email"}/>

         <Input validationResult={passwordValidationResult} onChange={handlePasswordChange}
                value={password}
                label={"Password"}
                id="password"
                type={"password"}/>

         <Input validationResult={secondPasswordValidationResult} onChange={handleSecondPasswordChange}
                value={secondPassword}
                label={"Repeat Password"}
                id="secondPassword"
                type={"password"}/>

      </div>
      <Button className={cssClasses.loginButton} onClick={handleRegister}>Register</Button></>
}