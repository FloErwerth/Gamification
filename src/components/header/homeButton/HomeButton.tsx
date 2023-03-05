import { Controller } from "../../../media/icons";
import { getClasses } from "../../../utils/styleUtils";
import { homeButtonStyles } from "./homeButtonStyles";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../../types/pages";
import { useAppSelector } from "../../../store/store";
import { getIsLoggedIn } from "../../../store/authentication/authSelectors";
import { useCallback } from "react";

const cssClasses = getClasses(homeButtonStyles);
export const HomeButton = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const handleClick = useCallback(() => {
    navigate(isLoggedIn ? Pages.OVERVIEW : Pages.HOME);
  }, [isLoggedIn]);
  return (
    <button onClick={handleClick} className={cssClasses.wrapper}>
      <Controller className={cssClasses.icon} />{" "}
      <b className={cssClasses.title}>Gamify</b>
    </button>
  );
};
