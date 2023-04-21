import {useCallback, useEffect, useMemo, useState} from "react";
import {Modal} from "../Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {addActivity} from "../../store/activities/activitiesActions";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addActivityInDatabase} from "../../../firebase";
import {getIsLoggedIn, getUserId,} from "../../store/authentication/authSelectors";
import {
   assambleFields,
   PREDEFINED_STATS_SET,
   PredefinedStatsSet,
   StatEnum,
   StatMap,
} from "../../store/activities/predefinedActivities";
import {FieldsSelector} from "../FieldsSelector/FieldsSelector";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {Input} from "../Input/Input";
import {ActivityProps} from "../../store/activities/types";
import {Dropdown} from "../Dropdown/Dropdown";
import {Button} from "../Button/Button";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {toast} from "react-toastify";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
}

const AddActivityModalContent = ({
                                    onCreation,
                                 }: ActivityAdderModalContentProps) => {
   const [activityName, setActivityName] = useState("");
   const [predefinedActivity, setPredefinedActivity] = useState<PredefinedStatsSet>(PREDEFINED_STATS_SET.Enum.Custom);
   const [stats, setStats] = useState<StatEnum[]>([])
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
      setStats(assambleFields(predefinedActivity))
   }, [predefinedActivity])

   const handleSetAdditionalFields = useCallback((statEnums: StatEnum[]) => {
      setStats((previous) => [...previous, ...statEnums]);
      setAddAdditionalAcitivity(false);
   }, [])

   const handleDeleteSelectedField = useCallback((deletedField: StatEnum) => {
      setStats((previous) =>
         previous.filter((field) => field !== deletedField))
   }, []);

   return (
      <div className={cssClasses.modalWrapper}>
         <div>Add an activity</div>
         <div>
            {predefinedActivity === PREDEFINED_STATS_SET.Enum.Custom &&
                <Input customWrapperClasses={cssClasses.nameInput} placeholder={"Name for the activity"}
                       onChange={(value) => setActivityName(value)}/>}
            <Dropdown options={PREDEFINED_STATS_SET.options}
                      label={predefinedActivity}
                      setValue={(value) => setPredefinedActivity(value as PredefinedStatsSet)}/>
            {predefinedActivity !== PREDEFINED_STATS_SET.Enum.Custom &&
                <div className={cssClasses.statsTitle}>The following stats are available:</div>}
            <div className={cssClasses.fieldsWrapper}>{stats.map((field) => {
                  const mappedField = StatMap(field);
                  return <DisplayedField name={mappedField.name}
                                         description={mappedField.description}
                                         onDeletion={handleDeleteSelectedField}
                                         deletable={mappedField.deletable}/>
               }
            )}</div>
            {isAddingActivityAllowed &&
                <Button onClick={() => setAddAdditionalAcitivity(true)} className={cssClasses.addButton}>+</Button>}
            {addAdditionalActivity &&
                <FieldsSelector onFieldSelectorClosed={handleSetAdditionalFields} open={addAdditionalActivity}
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
