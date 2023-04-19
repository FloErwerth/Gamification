import {AuthenticationMode} from "./types";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {addFirebaseUser, getStoredActivities, Signin, Signup} from "../../../firebase";
import {
   setCreationTime,
   setEmailAction,
   setLoggedIn,
   setStayLoggedIn,
   setUserId
} from "../../store/authentication/authActions";
import {setActivities} from "../../store/activities/activitiesActions";
import {Pages} from "../../types/pages";
import {Input} from "../../components/Input/Input";
import {Checkmark} from "../../components/Checkmark/Checkmark";
import {Button} from "../../components/Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Temporal} from "@js-temporal/polyfill";


const cssClasses = getClasses(styles);

const createDateFromFirebaseDate = (firebaseDate: string | undefined) => {
   if (!firebaseDate) {
      return "";
   }
   return Temporal.Instant.fromEpochMilliseconds(Date.parse(firebaseDate)).toLocaleString().split(", ")[0];
}

interface IAuthenticationForm {
   forcedMode?: AuthenticationMode;
   onActionDone?: () => void;
}

export const AuthenticationForm = ({forcedMode, onActionDone}: IAuthenticationForm) => {
   const [mode, setMode] = useState<AuthenticationMode>(forcedMode ?? "LOGIN");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const handleLogin = useCallback(async () => {
      const user = await Signin(email, password);
      const loggedIn = Boolean(user.user.email);
      if (loggedIn) {
         onActionDone?.();
         dispatch(setLoggedIn(loggedIn));
         dispatch(setUserId(user.user.uid));
         dispatch(setCreationTime(createDateFromFirebaseDate(user.user.metadata.creationTime)));
         const storedActivities = await getStoredActivities(user.user.uid);
         if (storedActivities) {
            dispatch(setActivities(storedActivities));
         }
         if (Boolean(user.user.email) && user.user.email) {
            dispatch(setEmailAction(user.user.email));
            navigate(Pages.OVERVIEW);
         }
      }
   }, [email, password]);


   const handleRegister = useCallback(async () => {
      if (password.length > 0) {
         const signupResult = await Signup(email, password);
         if (signupResult.user.email) {
            onActionDone?.();
            dispatch(setEmailAction(email));
            dispatch(setLoggedIn(true));
            dispatch(setUserId(signupResult.user.uid));
            addFirebaseUser(signupResult.user.uid).then(() => {
               navigate(Pages.OVERVIEW);
            });
         }
      }
   }, [email, password]);

   const handleActionClick = useCallback(async () => {
      if (mode === "LOGIN") {
         handleLogin().then();
      }
      if (mode === "REGISTER") {
         handleRegister().then();
      }
   }, [mode, handleLogin, handleRegister])

   const handleModeToggle = useCallback(() => {
      setPassword("");
      setEmail("");
      setMode((current) => current === "LOGIN" ? "REGISTER" : "LOGIN");
   }, [mode]);

   const handleStayLoggedIn = useCallback((value: boolean) => {
      dispatch(setStayLoggedIn(value));
   }, []);

   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.inputWrapper}>
         <h4>{mode}</h4>
         <Input
            onChange={(value) => setEmail(value)}
            value={email}
            placeholder={"Email"}
            type={"email"}
         />
         <Input
            onChange={(value) => setPassword(value)}
            value={password}
            placeholder={"Password"}
            type={"password"}
         />
         {mode === "LOGIN" && <Checkmark label="Stay logged in" onToggle={handleStayLoggedIn}/>}
      </div>
      <div className={cssClasses.buttonWrapper}>
         <Button className={cssClasses.loginButton} onClick={handleActionClick}>
            {mode === "LOGIN" ? "Login" : "Register"}
         </Button>
         <button
            className={cssClasses.registerLink}
            onClick={handleModeToggle}
         >
            {mode === "LOGIN" ? "Have no account yet? Click here to create one" : "Already have an account? Login"}
         </button>
      </div>
   </div>
};
