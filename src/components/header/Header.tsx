import {LoginButton} from "./loginButton/LoginButton";
import {getClasses} from "../../utils/styleUtils";
import {headerStyle} from "./style";
import {HomeButton} from "./homeButton/HomeButton";
import {useAppSelector} from "../../store/store";
import {getLoginData} from "../../store/authentication/authSelectors";
import {LogoutButton} from "./logoutButton/logoutButton";

const cssClasses = getClasses(headerStyle);
export const Header = () => {

   const loginData = useAppSelector(getLoginData);

   return <div className={cssClasses.headerWrapper}>
      <div><HomeButton/></div>
      <div>{loginData.loggedIn ? <div>
         <div style={{fontSize: 10}}>Logged in as:</div>
         <div style={{fontSize: 12}}>{loginData.email}</div>
         <LogoutButton/>
      </div> : <LoginButton/>}</div>
   </div>
}