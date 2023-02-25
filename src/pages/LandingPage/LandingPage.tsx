import {getClasses} from "../../utils/styleUtils";
import {landingPageStyles} from "./landingPageStyles";
import {Button} from "../../components/basicComponents/Button/Button";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";

const cssClasses = getClasses(landingPageStyles);

export const LandingPage = () => {

   const navigate = useNavigate();

   const handleSignup = useCallback(() => {
      navigate(Pages.REGISTER)
   }, [])

   const handleLogin = useCallback(() => {
      navigate(Pages.LOGIN);
   }, [])

   return <div className={cssClasses.wrapper}><h2 className={cssClasses.title}>Make your life a game. </h2>
      <h2 className={cssClasses.title}>Try Gamify.</h2>
      <Button onClick={handleSignup} className={cssClasses.button}>GAME ON</Button>
      <Button onClick={handleLogin} className={cssClasses.userbutton}>Login</Button>
   </div>
}