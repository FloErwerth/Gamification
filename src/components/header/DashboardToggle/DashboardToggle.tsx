import {Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {getClasses} from "../../../utils/styleUtils";
import {styles} from "./styles";
import {Dashboard} from "@mui/icons-material";
import {Pages} from "../../../types/pages";
import {useAppSelector} from "../../../store/store";
import {getActiveActivity} from "../../../store/activeActivity/activitySelector";
import {getLastPage} from "../../../store/router/routerSelectors";

const cssClasses = getClasses(styles)

export const DashboardToggle = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const activeActivity = useAppSelector(getActiveActivity);
   const lastPage = useAppSelector(getLastPage);

   return <>{activeActivity && activeActivity.activity && activeActivity.activity.name && lastPage === Pages.ACTIVITY && location.pathname === Pages.DASHBOARD ?
      <Button
         endIcon={<Dashboard/>}
         onClick={() => navigate(Pages.ACTIVITY)}
      >
         Return to {activeActivity.activity.name}
      </Button> : <Button
         endIcon={<Dashboard/>}
         onClick={() => navigate(Pages.DASHBOARD)}
      >
         Dashboard
      </Button>}</>
};
