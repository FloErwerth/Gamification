import {useCallback, useEffect, useState} from "react";
import {Activity} from "../../components/activity/Activitiy";
import {Button} from "../../components/basicComponents/Button/Button";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {setActivities, updateActivity} from "../../store/activities/activitiesActions";
import {StatsProps} from "../../components/activity/ActivityWrapper";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {updateActivitiesInDatabase} from "../../../firebase";
import {getUserId} from "../../store/authentication/authSelectors";
import {Calendar} from "../../components/calendar/Calendar";

const cssClasses = getClasses(styles);

export const ActivityPage = () => {
   const [progress, setProgress] = useState<number>(0);
   const [confirmed, setConfirmed] = useState(false);
   const activeActivity = useAppSelector(getActiveActivity);
   const uid = useAppSelector(getUserId);
   const activities = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (confirmed) {
      }
   }, [confirmed]);

   const [editProgress, setEditProgress] = useState(false);

   const getLevelAndMaxProgress = (activity: StatsProps, currentValue: StatsProps["currentValue"]): { maxValue: StatsProps["maxValue"], level: StatsProps["level"] } => {
      let level = activity.level;
      let maxValue = activity.maxValue;
      while (currentValue >= maxValue) {
         switch (activity.increasement) {
            case "Linear":
               level++;
               maxValue += 1;
               break;
            case "Quadratic":
               level++;
               maxValue = maxValue <= 1 ? 2 : Math.pow(maxValue, 2);
               break;
            case "Factor":
               level++;
               maxValue *= activity.increasementFactor;
               break;
            case "UNDEFINED":
               level++;
               maxValue += 1;
               break;
         }
      }
      return {level, maxValue};
   }

   const handleProgress = useCallback(() => {
      const currentValue = activeActivity.activity.currentValue + progress;
      const updatedActivity: StatsProps = {
         ...activeActivity.activity, currentValue,
         ...getLevelAndMaxProgress(activeActivity.activity, currentValue),
      }
      dispatch(updateActivity({
         index: activeActivity.index,
         activity: updatedActivity
      }));
      setEditProgress(false);
   }, [progress, editProgress, activeActivity]);

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedNum = parseInt(e.target.value);
      if (isNaN(parsedNum)) {
         setProgress(0);
      } else {
         setProgress(parsedNum);
      }
   }, []);

   const deleteCurrentActivity = useCallback(() => {
      const newActivitires = activities.filter((activity) => !Object.values(activity).every((val, index) => val === Object.values(activeActivity.activity)[index]))
      updateActivitiesInDatabase(uid, newActivitires).then(() => {
         navigate(Pages.OVERVIEW);
         dispatch(setActivities(newActivitires));
      });
   }, [uid, activeActivity]);

   return (
      <div className={cssClasses.wrapper}>
         <div className={cssClasses.title}>{activeActivity.activity.name}</div>
         <Activity {...activeActivity.activity} />
         <Calendar/>
         {editProgress ? (
            <div className={cssClasses.progressWrapper}>
               Cool, that you have made progress!{" "}
               <div>Tell us how many {activeActivity.activity.type} you got:</div>
               <input type={"text"} value={progress} onChange={handleChange}></input>
               <Button onClick={handleProgress}>Confirm progress</Button>
            </div>
         ) : (
            <Button onClick={() => setEditProgress(true)}>Make progess</Button>
         )}
         <Button onClick={deleteCurrentActivity}>Delete Activity</Button>
      </div>
   );
};
