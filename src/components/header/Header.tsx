import {LoginButton} from "./loginButton/LoginButton";
import {getClasses} from "../../utils/styleUtils";
import {headerStyle} from "./style";
import {HomeButton} from "./homeButton/HomeButton";

const cssClasses = getClasses(headerStyle);
export const Header = () => {
   return <div className={cssClasses.headerWrapper}>
      <div><HomeButton/></div>
      <div><LoginButton/></div>
   </div>
}