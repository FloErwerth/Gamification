import {Dispatch, SetStateAction, useCallback, useState} from "react";
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
import {StatEnumType, StatInfoMap} from "../../activitiesAssembly/stats";
import {ActivityAssembly} from "../../activitiesAssembly/activityAssembly";
import {Button} from "@mui/material";
import {AddCircle, ClearAllRounded} from "@mui/icons-material";
import {AutoComplete} from "../AutocompleteItem/AutoComplete";
import {getCategory} from "../../activitiesAssembly/categories";
import {EditStat} from "../EditStat/EditStat";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
   setStats: Dispatch<SetStateAction<StatEnumType[]>>;
   stats: StatEnumType[],
   onHandleSetActivityName: (name: PredefinedActivities | string) => void;
   onHandleStatEdit: (name: StatEnumType) => void;
   onHandleStatDeletion: (name: StatEnumType) => void;
   onAddAdditionalStats: (value: boolean) => void;
}

const StatAdder = ({
                      onAddAdditionalStats,
                      onCreation,
                      setStats,
                      stats,
                      onHandleSetActivityName,
                      onHandleStatEdit,
                      onHandleStatDeletion,
                   }: ActivityAdderModalContentProps) => {
   return (
      <>
         <div>Add an activity</div>
         <div className={cssClasses.fieldsContainer}>
            <AutoComplete onInputChange={onHandleSetActivityName} label={"Predefined activities"}
                          options={PredefinedActivities.options} groupBy={(option) => getCategory(option)}
                          onActivityChange={onHandleSetActivityName}/>
            <div className={cssClasses.fieldsOuterWrapper}>
               <div
                  className={cssClasses.statsTitle}>{stats.length > 0 && "The following stats will be added to your activity:"}</div>
               <div className={cssClasses.fieldsWrapper}>{stats.map((stat) => {
                     const mappedField = StatInfoMap(stat);
                     return <DisplayedField name={mappedField.name}
                                            onEdit={onHandleStatEdit}
                                            onDeletion={onHandleStatDeletion}/>
                  }
               )}</div>

            </div>
            <div className={cssClasses.buttons}>
               <Button startIcon={<AddCircle/>} onClick={() => onAddAdditionalStats(true)} color={"primary"}>Add
                  stat</Button>{stats.length > 0 &&
                <Button onClick={() => setStats([])} startIcon={<ClearAllRounded/>}>Clear all stats</Button>}
            </div>

         </div>
         <Button variant={"contained"} onClick={onCreation}>Create Activity</Button></>
   );
};

export const ActivityAdder = () => {
   const [showAdderModal, setShowAdderModal] = useState(false);
   const loggedIn = useAppSelector(getIsLoggedIn);
   const [activityName, setActivityName] = useState<PredefinedActivities | string>("Aerobic");
   const userId = useAppSelector(getUserId);
   const currentActivites = useAppSelector(getActivities);
   const [stats, setStats] = useState<StatEnumType[]>([]);
   const [addAdditionalActivity, setAddAdditionalAcitivity] = useState(false);

   const handleSetAdditionalFields = useCallback((statEnums: StatEnumType[]) => {
      setStats((previous) => [...previous, ...statEnums]);
      setAddAdditionalAcitivity(false);
   }, [])

   const dispatch = useAppDispatch();

   const [statEdit, setStatEdit] = useState<StatEnumType | undefined>(undefined);

   const handleDeleteSelectedField = useCallback((deletedField: StatEnumType) => {
      setStats((prev) => prev.filter((field) => field !== deletedField));
   }, [stats]);

   const handleSetPredefinedActivity = useCallback((name: PredefinedActivities) => {
      const assemblyStats = ActivityAssembly(name).filter((stat) => !stats.includes(stat));
      setActivityName(name);
      setStats([...assemblyStats, ...stats]);
   }, [stats]);

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
               <div className={cssClasses.modalWrapper}>{statEdit === undefined ?
                  <>{addAdditionalActivity ?
                     <StatSelector onFieldSelectorClosed={handleSetAdditionalFields} open={addAdditionalActivity}
                                   alreadyChosenFields={stats}/> :
                     <StatAdder onAddAdditionalStats={() => setAddAdditionalAcitivity(true)}
                                onHandleStatDeletion={handleDeleteSelectedField} stats={stats} setStats={setStats}
                                onCreation={handleCreation}
                                onHandleSetActivityName={handleSetPredefinedActivity}
                                onHandleStatEdit={(name) => setStatEdit(name)}
                     />}</> : <EditStat onEditConfirmed={() => setStatEdit(undefined)} name={statEdit}/>}</div>
            </Modal>
         )}
      </>
   );
};
