import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {deleteActivity, deleteCell, updateCell} from "../../store/activities/activitiesActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {updateActivitiesInDatabase} from "../../../firebase";
import {getUserId} from "../../store/authentication/authSelectors";
import {Calendar} from "../../components/calendar/Calendar";
import {DateType} from "../../store/activities/types";
import {Modal} from "../../components/Modal/Modal";
import {OpenedActivity} from "../../components/OpenedActivity/OpenedActivity";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {StatWithValue} from "../../store/activities/predefinedActivities";
import {ConfirmButton} from "../../components/ConfirmButton/ConfirmButton";
import {ActivityChart} from "../../components/Charts/ActivityChart/ActivityChart";

const cssClasses = getClasses(styles);
export const ActivityPage = () => {
   const [editProgress, setEditProgress] = useState(false);
   const [selectedDate, setSelectedDate] = useState<DateType>("00-00-00");
   const activeActivity = useAppSelector(getActiveActivity);
   const uid = useAppSelector(getUserId);
   const activities = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleProgressConfirm = useCallback((stats: StatWithValue[]) => {
      if (selectedDate) {
         dispatch(updateCell({
            activityIndex: activeActivity.index,
            date: selectedDate,
            content: {marked: true, stats}
         }))
      }
      setEditProgress(false);
   }, [activeActivity, selectedDate]);

   const handleDeleteProgress = useCallback(() => {
      if (selectedDate) {
         dispatch(deleteCell({
            date: selectedDate,
            activityIndex: activeActivity.index,
         }))
      }
      setEditProgress(false);
   }, [updateCell, activeActivity, selectedDate]);

   const handleDeletion = useCallback((deleteConfirmed: boolean) => {
      if (deleteConfirmed) {
         const newActivities = activities.filter((activity) => !Object.values(activity).every((val, index) => val === Object.values(activeActivity.activity)[index]));
         //todo make middleware
         updateActivitiesInDatabase(uid, newActivities).then(() => {
            dispatch(deleteActivity({activityIndex: activeActivity.index}));
            navigate(Pages.OVERVIEW);
         });
      }
   }, [uid, activeActivity, activities]);

   const handleCalendarClick = useCallback((date: DateType) => {
      setSelectedDate(date);
      setEditProgress(true);
   }, [editProgress]);

   if (!activeActivity || !activeActivity.activity) {
      return null;
   }

   const handleInfoChange = useCallback((info: string) => {
      dispatch(updateCell({activityIndex: activeActivity.index, date: selectedDate, content: {info}}))
   }, [selectedDate]);

   return (
      <div className={cssClasses.wrapper}>
         <ActivityChart/>
         <Calendar onClick={handleCalendarClick}/>
         <ConfirmButton
            hoverColor={"rgba(255,50,50,0.8)"} backgroundColor={"rgba(255,150,150,0.8)"} barColor={"red"}
            textColor={"black"}
            onClick={() => handleDeletion(true)}>Delete
            Activity</ConfirmButton>
         {editProgress && <Modal onClose={() => setEditProgress(false)} open={editProgress}>
             <OpenedActivity activeActivity={activeActivity} date={selectedDate}
                             onConfirmProgress={handleProgressConfirm}
                             onDeleteProgress={handleDeleteProgress} onInfoChange={handleInfoChange}/>
         </Modal>}
      </div>

   );
};
