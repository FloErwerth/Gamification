import {useCallback, useEffect, useMemo, useState} from "react";
import {Modal} from "../Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {addActivity} from "../../store/activities/activitiesActions";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addActivityInDatabase} from "../../../firebase";
import {getIsLoggedIn, getUserId,} from "../../store/authentication/authSelectors";
import {PredefinedActivities,} from "../../activitiesAssembly/predefinedActivities";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {Input} from "../Input/Input";
import {ActivityProps} from "../../store/activities/types";
import {Button} from "../Button/Button";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {toast} from "react-toastify";
import {StatSelector} from "../StatSelector/StatSelector";
import {StatEnumType, StatMap} from "../../activitiesAssembly/stats";
import {ActivityAssembly} from "../../activitiesAssembly/activityAssembly";
import {AutoComplete} from "../AutoComplete/AutoComplete";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
}

const AddActivityModalContent = ({
                                    onCreation,
                                 }: ActivityAdderModalContentProps) => {
   const [activityName, setActivityName] = useState("");
   const [predefinedActivity, setPredefinedActivity] = useState<PredefinedActivities>("Aerobic");
   const [stats, setStats] = useState<StatEnumType[]>([])
   const [addAdditionalActivity, setAddAdditionalAcitivity] = useState(false);
   const isAddingActivityAllowed = useMemo(() => stats.length < 5, [stats]);
   const userId = useAppSelector(getUserId);
   const currentActivites = useAppSelector(getActivities);

   const dispatch = useAppDispatch();

   const handleCreation = useCallback(() => {
      if (
         activityName.length > 3 && stats.length !== 0 &&
         userId
      ) {
         onCreation();
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

   useEffect(() => {
      if (predefinedActivity === "Custom") {
         setActivityName("");
      } else {
         setActivityName(predefinedActivity);
      }
      setStats(ActivityAssembly(predefinedActivity))
   }, [predefinedActivity])

   const handleSetAdditionalFields = useCallback((statEnums: StatEnumType[]) => {
      setStats((previous) => [...previous, ...statEnums]);
      setAddAdditionalAcitivity(false);
   }, [])

   const handleDeleteSelectedField = useCallback((deletedField: StatEnumType) => {
      setStats((previous) =>
         previous.filter((field) => field !== deletedField))
   }, []);

   return (
      <div className={cssClasses.modalWrapper}>
         <div>Add an activity</div>
         <div>
            {predefinedActivity === PredefinedActivities.Enum.Custom &&
                <Input customWrapperClasses={cssClasses.nameInput} label={"Activity name"}
                       onChange={(value) => setActivityName(value)}/>}
            <AutoComplete options={PredefinedActivities.options}
                          onChosenOption={(activity) => {
                             setPredefinedActivity(activity)
                          }}/>
            {predefinedActivity !== PredefinedActivities.Enum.Custom &&
                <div className={cssClasses.statsTitle}>The following stats are available:</div>}
            <div className={cssClasses.fieldsWrapper}>{stats.map((stat) => {
                  const mappedField = StatMap(stat);
                  return <DisplayedField name={mappedField.name}
                                         onDeletion={handleDeleteSelectedField}/>
               }
            )}</div>
            {isAddingActivityAllowed &&
                <Button onClick={() => setAddAdditionalAcitivity(true)} className={cssClasses.addButton}>+</Button>}
            {addAdditionalActivity &&
                <StatSelector onFieldSelectorClosed={handleSetAdditionalFields} open={addAdditionalActivity}
                              alreadyChosenFields={stats}/>}
         </div>
         <div>
            {isAddingActivityAllowed && <div style={{marginBottom: 10, fontSize: "smaller"}}>Note: You can add up
                to {5 - stats.length} more
                activities
            </div>}
            <Button onClick={handleCreation}>Create Activity</Button>
         </div>
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
            className={cssClasses.adder}
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
