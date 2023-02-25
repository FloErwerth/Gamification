import {useCallback, useMemo, useState} from "react";
import {getClasses} from "../../utils/styleUtils";
import {loginStyles} from "./loginStyles";
import {Input} from "../../components/basicComponents/Input/Input";
import {Button} from "../../components/basicComponents/Button/Button";
import {SafeParseReturnType, z} from "zod";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {FormWrapper} from "../../components/basicComponents/FormWrapper/FormWrapper";

const cssClasses = getClasses(loginStyles);

const getPassword = (_: string) => {
   return "HalloGallo123@";
}

const isEmailValid = (email: string) => {
   return "florianerwerth@hotmail.de" === email;
}

export const LoginPage = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [parsedPassword, setParsedPassword] = useState("");
   const [passwordValidationResult, setPasswordValidationResult] = useState<SafeParseReturnType<string, string>>()
   const [emailValidationResult, setEmailValidationResult] = useState<SafeParseReturnType<string, string>>()
   const passwordValidation = useMemo(() => z.string().regex(new RegExp(parsedPassword), "The password you have entered is not correct"), [parsedPassword]);

   const navigate = useNavigate();

   const handleLogin = useCallback(() => {

      if (!isEmailValid(email)) {
         setEmailValidationResult(z.string().email().regex(new RegExp("fakeRegExp"), "The email you have entered was not found").safeParse(email))
         return;
      }
      setEmailValidationResult(undefined)

      setParsedPassword(getPassword(email))
      const parsedPasswordValidation = passwordValidation.safeParse(password);
      setPasswordValidationResult(parsedPasswordValidation);

      if (!parsedPasswordValidation.success) {
         return;
      }

      console.log("redirect");
   }, [email, password])


   return <FormWrapper>
      <div className={cssClasses.title}>Login</div>
      <div className={cssClasses.inputWrapper}>
         <Input validationResult={emailValidationResult} onChange={(value) => setEmail(value)} value={email}
                label={"Email"}
                id="email"
                type={"email"}/>

         <Input validationResult={passwordValidationResult} onChange={(value) => setPassword(value)} value={password}
                label={"Password"}
                id="password"
                type={"password"}/>
      </div>
      <div className={cssClasses.buttonWrapper}><Button className={cssClasses.loginButton}
                                                        onClick={handleLogin}>Login</Button>
         <button className={cssClasses.registerLink} onClick={() => navigate(Pages.REGISTER)}>Have no account yet? Click
            here to create one
         </button>
      </div>
   </FormWrapper>
}
