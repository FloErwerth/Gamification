import {Controller} from "../../../media/icons";
import {getClasses} from "../../../utils/styleUtils";
import {homeButtonStyles} from "./homeButtonStyles";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../../types/pages";

const cssClasses = getClasses(homeButtonStyles);
export const HomeButton = () => {
   const navigate = useNavigate();


   return <button onClick={() => navigate(Pages.HOME)} className={cssClasses.wrapper}><Controller
      className={cssClasses.icon}/> <b
      className={cssClasses.title}>Gamify</b></button>
}