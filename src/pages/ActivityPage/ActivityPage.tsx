import { Activity } from "../../components/activity/Activitiy";
import { getActiveActivity } from "../../store/activity/activitySelector";
import { useAppSelector } from "../../store/store";

export const ActivityPage = () => {
  const activeActivity = useAppSelector(getActiveActivity);
  return (
    <div>
      <Activity {...activeActivity} />
    </div>
  );
};
