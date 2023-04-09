import {useCallback, useEffect, useState} from "react";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {
   decreaseActivityProgress,
   increaseActivityProgress,
   setActivities,
   updateActivity
} from "../../store/activities/activitiesActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {updateActivitiesInDatabase} from "../../../firebase";
import {getUserId} from "../../store/authentication/authSelectors";
import {Calendar} from "../../components/calendar/Calendar";
import {DateType, StatsProps} from "../../store/activities/types";
import {Modal} from "../../components/basicComponents/Modal/Modal";
import {CellInfo, OpenedActivity} from "../../components/OpenedActivity/OpenedActivity";
import {ConfirmButton} from "../../components/basicComponents/ConfirmButton/ConfirmButton";

const cssClasses = getClasses(styles);

const getTitleByActivityType = (activityType: StatsProps["type"], currentValue: StatsProps["currentValue"], activityName: StatsProps["name"]) => {
   switch (activityType) {
      case "Days":
         return `Already ${currentValue === 1 ? "a" : ""} ${currentValue > 1 ? currentValue : ""} ${currentValue > 1 ? "Days" : "Day"} on ${activityName}. Keep on going!`
   }
}

export const ActivityPage = () => {
   const [progress, setProgress] = useState<number>(0);
   const [editProgress, setEditProgress] = useState(false);
   const [cellInfo, setCellInfo] = useState<CellInfo>();
   const activeActivity = useAppSelector(getActiveActivity);
   const uid = useAppSelector(getUserId);
   const activities = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);

   useEffect(() => {
      return () => {
         updateActivitiesInDatabase(uid, activities).then();
      }
   }, []);

   const getCalendarEntries = useCallback(() => {
      return {...activeActivity.activity.calendarEntries}
   }, [activeActivity]);

   const updateCell = useCallback((date: DateType, content: { marked?: boolean, progress?: number }): StatsProps["calendarEntries"] => {
      const cells = getCalendarEntries();
      if (date && content) {
         cells[date] = {marked: content.marked ?? false, progress: content.progress};
      }
      return cells;
   }, [activeActivity, getCalendarEntries])

   const handleIncreaseProgress = useCallback(() => {
      if (cellInfo && cellInfo.date) {
         let currentValue = activeActivity.activity.currentValue;
         currentValue += activeActivity.activity.type === "Days" ? 1 : progress;
         const calendarEntries = updateCell(cellInfo.date, {marked: cellInfo.marked, progress});
         dispatch(updateActivity({
            index: activeActivity.index,
            activity: {...activeActivity.activity, currentValue, calendarEntries}
         }));
         dispatch(increaseActivityProgress({index: activeActivity.index, currentValue}))
         setEditProgress(false);
         setProgress(0);
      }
   }, [activeActivity, progress, cellInfo]);

   const handleDeleteProgress = useCallback(() => {
      const currentValue = activeActivity.activity.type === "Days" ? activeActivity.activity.currentValue - 1 : activeActivity.activity.currentValue + (cellInfo?.progress ?? 0) * -1;
      if (cellInfo?.date) {
         const calendarEntries = updateCell(cellInfo?.date, {marked: false})
         const updatedActivity = {
            ...activeActivity.activity,
            currentValue,
            calendarEntries,
            progress: cellInfo?.progress
         }
         dispatch(updateActivity({index: activeActivity.index, activity: updatedActivity}))
         dispatch(decreaseActivityProgress({index: activeActivity.index, currentValue}))
      }
      setEditProgress(false);
   }, [updateCell, activeActivity, cellInfo]);

   const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedNum = parseInt(e.target.value);
      if (isNaN(parsedNum) && -1) {
         setProgress(0);
      } else {
         setProgress(parsedNum);
      }
   }, []);

   const handleDeletion = useCallback((deleteConfirmed: boolean) => {
      setDeleteWarningOpen(false);
      if (deleteConfirmed) {
         const newActivitires = activities.filter((activity) => !Object.values(activity).every((val, index) => val === Object.values(activeActivity.activity)[index]))
         updateActivitiesInDatabase(uid, newActivitires).then(() => {
            navigate(Pages.OVERVIEW);
            dispatch(setActivities(newActivitires));
         });
      }
   }, [uid, activeActivity, activities]);

   const handleCalendarClick = useCallback((date: DateType, marked: boolean, progress?: number) => {
      setCellInfo({date, marked, progress});
      setEditProgress(true);
   }, [editProgress]);

   if (!activeActivity || !activeActivity.activity) {
      return null;
   }

   return (
      <div className={cssClasses.wrapper}>
         <div
            className={cssClasses.title}>{getTitleByActivityType(activeActivity.activity.type, activeActivity.activity.currentValue, activeActivity.activity.name)}</div>
         <Calendar onClick={handleCalendarClick}/>
         {editProgress && <Modal onClose={() => setEditProgress(false)} open={editProgress}>
             <OpenedActivity activity={activeActivity.activity} progress={progress} cellInfo={cellInfo}
                             onProgressChange={handleProgressChange} onIncreaseProgress={handleIncreaseProgress}
                             onDecreaseProgress={handleDeleteProgress}/>
         </Modal>}
         <ConfirmButton
            hoverColor={"rgba(255,50,50,0.8)"} backgroundColor={"rgba(255,150,150,0.8)"} barColor={"red"}
            textColor={"black"}
            onClick={() => handleDeletion(true)}>Delete
            Activity</ConfirmButton>
      </div>
   );
};
