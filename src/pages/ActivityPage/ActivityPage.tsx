import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {setActivities, updateActivity, updateAdditionalCellInfo} from "../../store/activities/activitiesActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {updateActivitiesInDatabase} from "../../../firebase";
import {getUserId} from "../../store/authentication/authSelectors";
import {Calendar} from "../../components/calendar/Calendar";
import {ActivityProps, DateType} from "../../store/activities/types";
import {Modal} from "../../components/Modal/Modal";
import {CellInfo, OpenedActivity} from "../../components/OpenedActivity/OpenedActivity";
import produce from "immer";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Stat} from "../../store/activities/predefinedActivities";
import {ConfirmButton} from "../../components/ConfirmButton/ConfirmButton";

const cssClasses = getClasses(styles);
export const ActivityPage = () => {
   const [editProgress, setEditProgress] = useState(false);
   const [cellInfo, setCellInfo] = useState<CellInfo>({date: "00-00-00"});
   const activeActivity = useAppSelector(getActiveActivity);
   const uid = useAppSelector(getUserId);
   const activities = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const navigate = useNavigate()

   useEffect(() => {
      return () => {
         if (document.location.href.split("//")[1].replace(document.location.host, "") === Pages.OVERVIEW) {
            updateActivitiesInDatabase(uid, activities).then(() => console.log("updated activities!"))
         }
      }
   }, [uid, activities])

   const getCalendarEntries = useCallback(() => {
      return {...activeActivity.activity.calendarEntries}
   }, [activeActivity]);

   const updateCell = useCallback((date: DateType, content: Partial<Omit<CellInfo, "date">>, hard?: boolean): ActivityProps["calendarEntries"] => {
      return produce(getCalendarEntries(), newCells => {
         if (hard && hard) {
            {
               newCells[date] = content;
            }
         }
         newCells[date] = {...newCells[date], ...content} ?? {...content};
      });
   }, [activeActivity, getCalendarEntries])

   const handleProgressConfirm = useCallback((stats: Stat[]) => {
      if (cellInfo?.date) {
         const calendarEntries = updateCell(cellInfo?.date, {marked: true, stats}, true)
         const updatedActivity = {
            ...activeActivity.activity,
            currentValue: 0,
            calendarEntries,
         }
         dispatch(updateActivity({activityIndex: activeActivity.index, activity: updatedActivity}))
      }
      setEditProgress(false);
   }, [activeActivity, cellInfo]);

   const handleDeleteProgress = useCallback(() => {
      const currentValue = 0;
      if (cellInfo?.date) {
         const calendarEntries = updateCell(cellInfo?.date, {marked: false}, true)
         const updatedActivity = {
            ...activeActivity.activity,
            currentValue,
            calendarEntries,
         }
         dispatch(updateActivity({activityIndex: activeActivity.index, activity: updatedActivity}))
      }
      setEditProgress(false);
   }, [updateCell, activeActivity, cellInfo]);

   const handleDeletion = useCallback((deleteConfirmed: boolean) => {
      if (deleteConfirmed) {
         const newActivitires = activities.filter((activity) => !Object.values(activity).every((val, index) => val === Object.values(activeActivity.activity)[index]))
         updateActivitiesInDatabase(uid, newActivitires).then(() => {
            navigate(Pages.OVERVIEW);
            dispatch(setActivities(newActivitires));
         });
      }
   }, [uid, activeActivity, activities]);

   const handleCalendarClick = useCallback((date: DateType, marked: boolean, stats: Stat[], info?: string) => {
      setCellInfo({date, marked, stats, info});
      setEditProgress(true);
   }, [editProgress]);

   if (!activeActivity || !activeActivity.activity) {
      return null;
   }
   const handleInfoChange = useCallback((info: string) => {
      setCellInfo((current) => {
         return {...current, info}
      })
      dispatch(updateAdditionalCellInfo({activityIndex: activeActivity.index, info, date: cellInfo.date}))
   }, [cellInfo]);

   return (
      <div className={cssClasses.wrapper}>
         <Calendar onClick={handleCalendarClick}/>
         <ConfirmButton
            hoverColor={"rgba(255,50,50,0.8)"} backgroundColor={"rgba(255,150,150,0.8)"} barColor={"red"}
            textColor={"black"}
            onClick={() => handleDeletion(true)}>Delete
            Activity</ConfirmButton>
         {editProgress && <Modal onClose={() => setEditProgress(false)} open={editProgress}>
             <OpenedActivity activity={activeActivity.activity} cellInfo={cellInfo}
                             onConfirmProgress={handleProgressConfirm}
                             onDeleteProgress={handleDeleteProgress} onInfoChange={handleInfoChange}/>
         </Modal>}
      </div>

   );
};
