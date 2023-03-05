import { LoginButton } from "./loginButton/LoginButton";
import { getClasses } from "../../utils/styleUtils";
import { headerStyle } from "./style";
import { HomeButton } from "./homeButton/HomeButton";
import { useAppSelector } from "../../store/store";
import {
  getIsLoggedIn,
  getLoginData,
} from "../../store/authentication/authSelectors";
import { DashboardButton } from "./dashboardButton/dashboardButton";

const cssClasses = getClasses(headerStyle);
export const Header = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  return (
    <div className={cssClasses.headerWrapper}>
      <div>
        <HomeButton />
      </div>
      <div className={cssClasses.buttonWrapper}>
        {isLoggedIn && <DashboardButton />}
        <LoginButton />
      </div>
    </div>
  );
};
