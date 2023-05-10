import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {Button} from "../../basicComponents/Button/Button";
import {OverallStatistics} from "../../Statistics/OverallStatistics";

export const Dashboard = () => {
   const navigate = useNavigate();

   return (
      <div>
         <h2>Dashboard</h2>
         <OverallStatistics/>

         <Button onClick={() => navigate(Pages.OVERVIEW)}>
            Return to overview
         </Button>
      </div>
   );
};
