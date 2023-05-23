import {Dispatch, SetStateAction, useCallback, useContext, useState} from "react";
import {Modal} from "../../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {addActivity} from "../../store/activities/activitiesActions";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addActivityInDatabase} from "../../../firebase";
import {getIsLoggedIn, getUserId,} from "../../store/authentication/authSelectors";
import {PredefinedActivities,} from "../../activitiesAssembly/predefinedActivities";
import {ActivityProps} from "../../store/activities/types";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {toast} from "react-toastify";
import {StatSelector} from "./Components/StatSelector/StatSelector";
import {Stat} from "../../activitiesAssembly/stats";
import {Button} from "@mui/material";
import {StatOverview} from "./StatOverview/StatOverview";
import {EditStat} from "../EditStat/EditStat";
import {ActivityAdderContext} from "./ActivityAdderContext/ActivityAdderContext";

const cssClasses = getClasses(activityAdderClasses);

export interface ActivityAdderModalContentProps {
   onCreation: () => void;
   onSetStats: (stats: Stat[]) => void;
   stats: Stat[],
   onHandleStatDeletion: (name: Stat) => void;
   onAddAdditionalStats: (value: boolean) => void;
   activityName?: string;
   setActivityName: Dispatch<SetStateAction<string>>
}


export const ActivityAdder = () => {
   const [showAdderModal, setShowAdderModal] = useState(false);
   const loggedIn = useAppSelector(getIsLoggedIn);
   const [activityName, setActivityName] = useState<PredefinedActivities | string>("");
   const userId = useAppSelector(getUserId);
   const currentActivites = useAppSelector(getActivities);
   const [stats, setStats] = useState<Stat[]>([]);
   const [addAdditionalActivity, setAddAdditionalAcitivity] = useState(false);
   const {editStat} = useContext(ActivityAdderContext);

   const handleSetAdditionalFields = useCallback((selectedFields: Stat[]) => {
      setStats((stats) => [...stats, ...selectedFields]);
      setAddAdditionalAcitivity(false);
   }, [stats])

   const dispatch = useAppDispatch();

   const handleDeleteSelectedField = useCallback((deletedField: Stat) => {
      setStats((prev) => prev.filter((field) => field.name !== deletedField.name));
   }, [stats]);

   const handleSetAddedStats = useCallback((newStats: Stat[]) => {
      if (newStats.length === 0) {
         setStats([]);
         return;
      }
      const newDefaultStats = newStats.filter((stat) => !stats.find((curStat) => curStat.name === stat.name));
      setStats([...stats, ...newDefaultStats]);
   }, [activityName, stats]);

   const handleCreation = useCallback(() => {
      if (
         activityName.length > 3 && stats.length !== 0 &&
         userId
      ) {
         toast("Activity Added", {type: "success"})
         setShowAdderModal(false);
         const generatedActivity: ActivityProps = {
            name: activityName,
            calendarEntries: {},
            stats,
            maxValue: 1,
            currentValue: 0,
            level: 0,
         };
         addActivityInDatabase(userId, currentActivites, generatedActivity).then(() => {
            dispatch(addActivity(generatedActivity));
         });
      }
   }, [userId, activityName, stats]);

   if (!loggedIn) {
      return null;
   }

   const handleClose = useCallback(() => {
      setShowAdderModal(false);
      setAddAdditionalAcitivity(false);
   }, []);

   return (
      <><Button
         className={cssClasses.addButton}
         onClick={() => setShowAdderModal(true)}
      >
         Add Activity
      </Button>
         {showAdderModal && (
            <Modal open={showAdderModal} onClose={handleClose}>
               <div className={cssClasses.modalWrapper}>{addAdditionalActivity ?
                  <StatSelector onFieldSelectorClosed={handleSetAdditionalFields}
                                alreadyChosenFields={stats}/> :
                  <>{editStat ?
                     <EditStat/> :
                     <StatOverview setActivityName={setActivityName} activityName={activityName}
                                   onAddAdditionalStats={() => setAddAdditionalAcitivity(true)}
                                   onHandleStatDeletion={handleDeleteSelectedField}
                                   stats={stats}
                                   onSetStats={handleSetAddedStats}
                                   onCreation={handleCreation}/>}</>
               }</div>
            </Modal>
         )}
      </>
   );
};