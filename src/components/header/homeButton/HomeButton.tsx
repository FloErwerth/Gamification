import {getClasses} from "../../../utils/styleUtils";
import {homeButtonStyles} from "./homeButtonStyles";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../../types/pages";
import {useAppSelector} from "../../../store/store";
import {getIsLoggedIn} from "../../../store/authentication/authSelectors";
import {useCallback} from "react";
import {Logo} from "../../../media/icons";

const cssClasses = getClasses(homeButtonStyles);
export const HomeButton = () => {
   const navigate = useNavigate();
   const isLoggedIn = useAppSelector(getIsLoggedIn);

   const handleClick = useCallback(() => {
      navigate(isLoggedIn ? Pages.OVERVIEW : Pages.HOME);
   }, [isLoggedIn]);

   return (
      <button onClick={handleClick} className={cssClasses.wrapper}>
         <Logo className={cssClasses.icon}/>
         <b className={cssClasses.title}>Gamify</b>
      </button>
   );
};
