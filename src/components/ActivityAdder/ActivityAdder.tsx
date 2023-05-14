import {useCallback, useEffect, useState} from "react";
import {Modal} from "../../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {addActivity} from "../../store/activities/activitiesActions";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addActivityInDatabase} from "../../../firebase";
import {getIsLoggedIn, getUserId,} from "../../store/authentication/authSelectors";
import {PredefinedActivities,} from "../../activitiesAssembly/predefinedActivities";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {ActivityProps} from "../../store/activities/types";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {toast} from "react-toastify";
import {StatSelector} from "../StatSelector/StatSelector";
import {StatEnumType, StatMap} from "../../activitiesAssembly/stats";
import {ActivityAssembly} from "../../activitiesAssembly/activityAssembly";
import {Button} from "@mui/material";
import {AddCircle, ClearAllRounded} from "@mui/icons-material";
import {AutoComplete} from "../AutocompleteItem/AutoComplete";
import {getCategory} from "../../activitiesAssembly/categories";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
}

const AddActivityModalContent = ({
                                    onCreation,
                                 }: ActivityAdderModalContentProps) => {
   const [activity, setActivity] = useState<PredefinedActivities | string>("Aerobic");
   const [stats, setStats] = useState<StatEnumType[]>([]);
   const [additionalStats, setAdditionalStats] = useState<StatEnumType[]>([])
   const [addAdditionalActivity, setAddAdditionalAcitivity] = useState(false);
   const userId = useAppSelector(getUserId);
   const currentActivites = useAppSelector(getActivities);

   const dispatch = useAppDispatch();

   const handleCreation = useCallback(() => {
      if (
         activity.length > 3 && stats.length !== 0 &&
         userId
      ) {
         onCreation();
         const generatedActivity: ActivityProps = {
            name: activity,
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
   }, [userId, activity, stats]);

   useEffect(() => {
      const assemblyStats = ActivityAssembly(activity);
      setStats([...assemblyStats, ...additionalStats]);
   }, [activity])

   const handleSetAdditionalFields = useCallback((statEnums: StatEnumType[]) => {
      setAdditionalStats((previous) => [...previous, ...statEnums]);
      setAddAdditionalAcitivity(false);
   }, [])

   const handleDeleteSelectedField = useCallback((deletedField: StatEnumType) => {
      setStats((prev) => prev.filter((field) => field !== deletedField));
      setAdditionalStats((previous) =>
         previous.filter((field) => field !== deletedField))
   }, [stats, additionalStats]);

   return (
      <div className={cssClasses.modalWrapper}>
         <div>Add an activity</div>
         <div>
            <AutoComplete onInputChange={(value) => setActivity(value)} label={"Predefined activities"}
                          options={PredefinedActivities.options} groupBy={(option) => getCategory(option)}
                          onActivityChange={(value) => setActivity(value)}/>
            {stats.length > 0 &&
                <div className={cssClasses.statsTitle}>The following stats will be added to your activity:</div>}
            <div className={cssClasses.fieldsWrapper}>{[...stats, ...additionalStats].map((stat) => {
                  const mappedField = StatMap(stat);
                  return <DisplayedField name={mappedField.name}
                                         onDeletion={handleDeleteSelectedField}/>
               }
            )}</div>
            <div className={cssClasses.addButtonWrapper}>
               <Button startIcon={<AddCircle/>} onClick={() => setAddAdditionalAcitivity(true)} color={"primary"}>Add
                  stat</Button>{stats.length > 0 &&
                <Button onClick={() => setStats([])} startIcon={<ClearAllRounded/>}>Clear all stats</Button>}</div>
            {addAdditionalActivity &&
                <StatSelector onFieldSelectorClosed={handleSetAdditionalFields} open={addAdditionalActivity}
                              alreadyChosenFields={stats}/>}
         </div>
         <Button variant={"contained"} onClick={handleCreation}>Create Activity</Button>
      </div>
   );
};

export const ActivityAdder = () => {
   const [showAdderModal, setShowAdderModal] = useState(false);
   const loggedIn = useAppSelector(getIsLoggedIn);

   const handleCreation = useCallback(() => {
      setShowAdderModal(false);
      toast("Activity Added", {type: "success"})
   }, [toast])

   if (!loggedIn) {
      return null;
   }

   return (
      <>
         <Button
            className={cssClasses.addButton}
            onClick={() => setShowAdderModal(true)}
         >
            Add Activity
         </Button>
         {showAdderModal && (
            <Modal open={showAdderModal} onClose={() => setShowAdderModal(false)}>
               <AddActivityModalContent
                  onCreation={handleCreation}
               />
            </Modal>
         )}
      </>
   );
};
