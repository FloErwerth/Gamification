import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../store/store";
import {Pages} from "../../types/pages";
import {Button} from "../../basicComponents/Button/Button";
import {getChartData} from "../../store/activeActivity/activitySelector";
import {useState} from "react";
import {ActivityProps} from "../../store/activities/types";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {OverallStatistics} from "../../components/OverallStatistics/OverallStatistics";

export const Dashboard = () => {
   const navigate = useNavigate();
   const buttons = useAppSelector(getActivities).filter((activity) => Object.values(activity.calendarEntries).length >= 2).map((activity) =>
      <Button onClick={() => setSelectedActivity(activity)}>{activity.name}</Button>);
   const [selectedActivity, setSelectedActivity] = useState<ActivityProps>()
   const chartData = useAppSelector(getChartData(selectedActivity));

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
