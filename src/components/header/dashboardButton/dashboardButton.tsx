import {useNavigate} from "react-router-dom";
import {Settings} from "../../../media/icons";
import {Pages} from "../../../types/pages";
import {getClasses} from "../../../utils/styleUtils";
import {Button} from "../../Button/Button";
import {styles} from "./styles";

const cssClasses = getClasses(styles);
export const DashboardButton = () => {
   const navigate = useNavigate();
   return (
      <Button
         className={cssClasses.dashboardButton}
         onClick={() => navigate(Pages.DASHBOARD)}
      >
         <Settings className={cssClasses.dashboardButton}/>
      </Button>
   );
};
