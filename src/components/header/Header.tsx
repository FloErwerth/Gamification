import {LoginToggle} from "./LoginToggle/LoginToggle";
import {getClasses} from "../../utils/styleUtils";
import {headerStyle} from "./style";
import {HomeButton} from "./homeButton/HomeButton";
import {useAppSelector} from "../../store/store";
import {getIsLoggedIn,} from "../../store/authentication/authSelectors";
import {DashboardToggle} from "./DashboardToggle/DashboardToggle";

const cssClasses = getClasses(headerStyle);
export const Header = () => {
   const isLoggedIn = useAppSelector(getIsLoggedIn);

   return (
      <div className={cssClasses.headerWrapper}>
         <div>
            <HomeButton/>
         </div>
         <div className={cssClasses.buttonWrapper}>
            {isLoggedIn && <DashboardToggle/>}
            <LoginToggle/>
         </div>
      </div>
   );
};
