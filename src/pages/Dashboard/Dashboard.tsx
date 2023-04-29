import {useNavigate} from "react-router-dom";
import {getLoginData} from "../../store/authentication/authSelectors";
import {useAppSelector} from "../../store/store";
import {Pages} from "../../types/pages";
import {Button} from "../../basicComponents/Button/Button";
import {ActivityChart} from "../../components/Charts/ActivityChart/ActivityChart";
import {getChartData} from "../../store/activeActivity/activitySelector";
import {useState} from "react";
import {ActivityProps} from "../../store/activities/types";
import {getActivities} from "../../store/activities/activitiesSelectors";

export const Dashboard = () => {
   const userData = useAppSelector(getLoginData);
   const navigate = useNavigate();
   const buttons = useAppSelector(getActivities).filter((activity) => Object.values(activity.calendarEntries).length >= 2).map((activity) =>
      <Button onClick={() => setSelectedActivity(activity)}>{activity.name}</Button>);
   const [selectedActivity, setSelectedActivity] = useState<ActivityProps>()
   const chartData = useAppSelector(getChartData(selectedActivity));

   return (
      <div>
         <h2>Dashboard</h2>
         {buttons.length > 0 ? buttons : "There are no activities with data to display statistics"}
         {chartData && <ActivityChart chartData={chartData}/>}
         <Button onClick={() => navigate(Pages.OVERVIEW)}>
            Return to overview
         </Button>
      </div>
   );
};
