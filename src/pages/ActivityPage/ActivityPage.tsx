import {useCallback, useContext, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {deleteActivity, deleteCell, updateCell} from "../../store/activities/activitiesActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {deleteActivityCell, updateActivitiesInDatabase} from "../../../firebase";
import {getUserId} from "../../store/authentication/authSelectors";
import {Calendar} from "../../components/calendar/Calendar";
import {DateType, StatValuePair} from "../../store/activities/types";
import {Modal} from "../../basicComponents/Modal/Modal";
import {OpenedActivity} from "../../components/OpenedActivity/OpenedActivity";
import {getActiveActivity} from "../../store/activeActivity/activitySelector";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {ConfirmButton} from "../../components/ConfirmButton/ConfirmButton";
import {toast} from "react-toastify";
import {setLastPage} from "../../store/router/routerActions";
import {ActivityChart} from "../../components/Charts/ActivityChart/ActivityChart";
import {ActivityStatistics} from "../../Statistics/ActivityStatistics";
import {Button} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {
   ActivityManipulatorContext
} from "../../components/ActivityManipulator/ActivityManipulatorContext/ActivityManipulatorContext";
import {isTimeType, toSeconds} from "../../utils/getStringifiedTime";

const cssClasses = getClasses(styles);
export const ActivityPage = () => {

   const [editProgress, setEditProgress] = useState(false);
   const [selectedDate, setSelectedDate] = useState<DateType>("00-00-00");
   const uid = useAppSelector(getUserId);
   const activeActivity = useAppSelector(getActiveActivity);
   const activities = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const {openActivityManipulator} = useContext(ActivityManipulatorContext);

   const handleConfirmProgress = useCallback((stats: StatValuePair[]) => {
      if (selectedDate) {
         const values = stats.map((pair) => {
            const currentType = activeActivity.activity?.stats.find(({statName}) => statName === pair.statName)?.type;
            if (isTimeType(currentType)) {
               return toSeconds(pair.value, currentType) ?? pair.value;
            }
            return pair.value;
         })
         dispatch(updateCell({
            activityIndex: activeActivity.index,
            date: selectedDate,
            values,
         }));
         toast("Updated Progress!", {type: "success"})
      }
      setEditProgress(false);
   }, [activeActivity, selectedDate]);

   const handleDeleteProgress = useCallback(() => {
      if (selectedDate) {
         dispatch(deleteCell({
            date: selectedDate,
            activityIndex: activeActivity.index,
         }))
         deleteActivityCell(uid, activeActivity.index, selectedDate);
         toast("Deleted progress", {type: "info"})
      }
      setEditProgress(false);
   }, [updateCell, activeActivity, selectedDate]);

   const handleDeletion = useCallback((deleteConfirmed: boolean) => {
      if (deleteConfirmed) {
         const newActivities = activities.filter((activity) => !Object.values(activity).every((val, index) => val === Object.values(activeActivity.activity)[index]));
         updateActivitiesInDatabase(uid, newActivities).then(() => {
            dispatch(deleteActivity({activityIndex: activeActivity.index}));
            navigate(Pages.OVERVIEW);
         });
         toast("Deleted activity", {type: "info"})
      }
   }, [uid, activeActivity, activities]);

   const handleCalendarClick = useCallback((date: DateType) => {
      setSelectedDate(date);
      setEditProgress(true);
   }, [editProgress]);

   useEffect(() => {
      return () => {
         dispatch(setLastPage(Pages.ACTIVITY));
      }
   }, [])

   const handleActivityEdit = useCallback(() => {
      openActivityManipulator?.(true);
   }, [openActivityManipulator]);

   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}>{activeActivity.activity?.activityName}<Button onClick={handleActivityEdit}
                                                                                       startIcon={<Edit/>}>Edit
         activity</Button></div>
      <Calendar onClick={handleCalendarClick}/>
      <ActivityChart/>
      <ActivityStatistics/>
      <ConfirmButton
         hoverColor={"rgba(255,50,50,0.8)"} backgroundColor={"rgba(255,150,150,0.8)"} barColor={"red"}
         textColor={"black"}
         onClick={() => handleDeletion(true)}>Delete
         Activity</ConfirmButton>
      {editProgress && <Modal onClose={() => setEditProgress(false)} open={editProgress}>
          <OpenedActivity activeActivity={activeActivity} date={selectedDate}
                          onConfirmProgress={handleConfirmProgress}
                          onDeleteProgress={handleDeleteProgress}/>

      </Modal>}
   </div>
};
