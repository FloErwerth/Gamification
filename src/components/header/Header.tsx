import {LoginToggle} from "./LoginToggle/LoginToggle";
import {getClasses} from "../../utils/styleUtils";
import {headerStyle} from "./style";
import {HomeButton} from "./homeButton/HomeButton";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getIsLoggedIn,} from "../../store/authentication/authSelectors";
import {DashboardButton} from "./dashboardButton/dashboardButton";
import {useCallback} from "react";
import {SignOut} from "../../../firebase";
import {setLoggedIn} from "../../store/authentication/authActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";

const cssClasses = getClasses(headerStyle);
export const Header = () => {
   const isLoggedIn = useAppSelector(getIsLoggedIn);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleClick = useCallback(() => {
      if (isLoggedIn) {
         navigate(Pages.HOME);
         SignOut().then(() => {
            dispatch(setLoggedIn(false));
         });
      }
   }, [isLoggedIn]);

   return (
      <div className={cssClasses.headerWrapper}>
         <div>
            <HomeButton/>
         </div>
         <div className={cssClasses.buttonWrapper}>
            {isLoggedIn && <DashboardButton/>}
            <LoginToggle handleClick={handleClick}/>
         </div>
      </div>
   );
};
