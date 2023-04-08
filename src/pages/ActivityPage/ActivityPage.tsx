import {useCallback, useEffect, useState} from "react";
import {Activity} from "../../components/activity/Activitiy";
import {Button} from "../../components/basicComponents/Button/Button";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {setActivities, updateActivity} from "../../store/activities/activitiesActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {updateActivitiesInDatabase} from "../../../firebase";
import {getUserId} from "../../store/authentication/authSelectors";
import {Calendar} from "../../components/calendar/Calendar";
import {DateType, StatsProps} from "../../store/activities/types";
import {Modal} from "../../components/basicComponents/Modal/Modal";

const cssClasses = getClasses(styles);

const getLevelAndMaxProgress = (activity: StatsProps, currentValue: StatsProps["currentValue"]): { maxValue: StatsProps["maxValue"], level: StatsProps["level"] } => {
   let level = activity.level;
   let maxValue = activity.maxValue;
   if (currentValue >= maxValue) {
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
   } else {
      switch (activity.increasement) {
         case "Linear":
            while (currentValue < maxValue - 1) {
               level--;
               maxValue -= 1;
            }
            break;
         case "Quadratic":
            while (currentValue < Math.sqrt(maxValue)) {
               if (Math.sqrt(maxValue) === 2) {
                  maxValue = 1;
                  level = 0;
                  break;
               }
               level--;
               maxValue = Math.sqrt(maxValue) === 2 ? 1 : Math.sqrt(maxValue);
            }
            break;
         case "Factor":
            while (currentValue < maxValue / activity.increasementFactor && maxValue / activity.increasementFactor >= 1) {
               level--;
               maxValue /= activity.increasementFactor;
            }
            break;
         case "UNDEFINED":
            while (currentValue < maxValue - 1) {
               level--;
               maxValue -= 1;
            }
            break;
      }
   }
   return {level, maxValue};
};

export const ActivityPage = () => {
   const [progress, setProgress] = useState<number>(0);
   const [editProgress, setEditProgress] = useState(false);
   const [cellInfo, setCellInfo] = useState<{ date?: DateType, marked: boolean, progress?: number } | undefined>();
   const activeActivity = useAppSelector(getActiveActivity);
   const uid = useAppSelector(getUserId);
   const activities = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      return () => {
         updateActivitiesInDatabase(uid, activities).then();
      }
   }, []);

   const getCopyOfCalendarEntries = useCallback(() => {
      return {...activities[activeActivity.index].calendarEntries};
   }, [activities]);

   const getUpdatedCells = useCallback(() => {
      const cells = getCopyOfCalendarEntries();
      if (cellInfo?.date) {
         if (cellInfo?.marked) {
            cells[cellInfo?.date] = {marked: true, progress}
         } else {
            cells[cellInfo?.date] = {marked: false}
         }
      }
      return cells;
   }, [getCopyOfCalendarEntries, cellInfo, progress])

   const getUpdatedActivity = useCallback(() => {
      const cells = getUpdatedCells();
      let currentValue = progress;
      if (cellInfo && cellInfo.progress) {
         currentValue = cellInfo.progress * -1;
      }
      currentValue += activeActivity.activity.currentValue;
      return {
         ...activeActivity.activity,
         currentValue,
         ...getLevelAndMaxProgress(activeActivity.activity, currentValue),
         calendarEntries: cells
      }
   }, [cellInfo, progress, getUpdatedCells, activeActivity]);

   const handleProgress = useCallback(() => {
      const updatedActivity = getUpdatedActivity();
      dispatch(updateActivity({
         index: activeActivity.index,
         activity: updatedActivity
      }));
      setEditProgress(false);
      setProgress(0);
   }, [activeActivity, getUpdatedActivity]);

   const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedNum = parseInt(e.target.value);
      if (isNaN(parsedNum) && -1) {
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
   }, [uid, activeActivity, activities]);

   useEffect(() => {
      if (cellInfo) {
         if (cellInfo.marked) {
            setEditProgress(true);
         } else {
            handleProgress();
         }
      }
   }, [cellInfo]);

   const handleCalendarClick = useCallback((date: DateType, marked: boolean, progress?: number) => {
      setCellInfo({date, marked, progress});
   }, []);

   return (
      <div className={cssClasses.wrapper}>
         <div className={cssClasses.title}>{activeActivity.activity.name}</div>
         <Activity {...activeActivity.activity} />
         <Calendar onClick={handleCalendarClick}/>
         <Modal open={editProgress}>
            <div className={cssClasses.progressWrapper}>
               Cool, that you have made progress!{" "}
               <div>Tell us how many {activeActivity.activity.type} you got:</div>
               <input type={"text"} value={progress} onChange={handleProgressChange}></input>
               <Button onClick={handleProgress}>Confirm progress</Button>
            </div>
         </Modal>
         <Button onClick={deleteCurrentActivity}>Delete Activity</Button>
      </div>
   );
};
