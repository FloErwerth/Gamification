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
import {getDefaultStats, Stat, StatEnumType} from "../../activitiesAssembly/stats";
import {Button} from "@mui/material";
import {AddCircle, ClearAllRounded} from "@mui/icons-material";
import {AutoComplete} from "../AutocompleteItem/AutoComplete";
import {getCategory} from "../../activitiesAssembly/categories";
import {WithHelpText} from "../../hoc/WithHelpText/WithHelpText";
import {ActivityAssembly} from "../../activitiesAssembly/activityAssembly";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
   onSetStats: (stats: StatEnumType[]) => void;
   stats: StatEnumType[],
   onHandleStatDeletion: (name: StatEnumType) => void;
   onAddAdditionalStats: (value: boolean) => void;
   activityName?: string;
   setActivityName: Dispatch<SetStateAction<string>>
}

const StatAdder = ({
                      setActivityName,
                      activityName,
                      onAddAdditionalStats,
                      onCreation,
                      onSetStats,
                      stats,
                      onHandleStatDeletion,
                   }: ActivityAdderModalContentProps) => {

   const handleSetActivityName = useCallback((name: PredefinedActivities) => {
      setActivityName(name);
      if (stats.length === 0 || name && name !== activityName) {
         const parsedStats = ActivityAssembly(name);
         onSetStats([...stats, ...parsedStats])
      }
   }, [activityName, stats, ActivityAssembly])

   const handleClearStats = useCallback(() => {
      onSetStats([]);
      if (activityName && PredefinedActivities.options.find((option) => option === activityName)) {
         setActivityName("");
      }
   }, [activityName])

   return (
      <>
         <div>Add an activity</div>
         <div className={cssClasses.fieldsContainer}>
            <WithHelpText position={"end"} placement={"right"}
                          helpText={"You can also define your own activity by typing in the name and add stats to it."}><AutoComplete
               onInputChange={handleSetActivityName}
               label={"Activity Name"}
               value={activityName}
               options={PredefinedActivities.options}
               groupBy={(option) => getCategory(option)}
               onActivityChange={handleSetActivityName}/></WithHelpText>
            <div className={cssClasses.fieldsOuterWrapper}>
               <div
                  className={cssClasses.statsTitle}>{stats.length > 0 &&
                   <small>The following stats will be added to your activity:</small>}</div>
               <div className={cssClasses.fieldsWrapper}>{stats.map((stat) => {
                     //enable edition units with new component
                     return <DisplayedField name={stat}
                                            onDeletion={onHandleStatDeletion}/>
                  }
               )}</div>

            </div>
            <div className={cssClasses.buttons}>
               <Button startIcon={<AddCircle/>} onClick={() => onAddAdditionalStats(true)} color={"primary"}>Add
                  stat</Button>{stats.length > 0 &&
                <Button onClick={handleClearStats} startIcon={<ClearAllRounded/>}>Clear all stats</Button>}
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
   const [stats, setStats] = useState<Stat[]>([]);
   const [addAdditionalActivity, setAddAdditionalAcitivity] = useState(false);

   const handleSetAdditionalFields = useCallback((selectedFields: StatEnumType[]) => {
      const additionalStats = getDefaultStats(selectedFields);
      setStats((stats) => [...stats, ...additionalStats]);
      setAddAdditionalAcitivity(false);
   }, [stats])

   const dispatch = useAppDispatch();

   const handleDeleteSelectedField = useCallback((deletedField: StatEnumType) => {
      setStats((prev) => prev.filter((field) => field.name !== deletedField));
   }, [stats]);

   const handleSetAddedStats = useCallback((newStats: StatEnumType[]) => {
      if (newStats.length === 0) {
         setStats([]);
         return;
      }
      const newDefaultStats = newStats.filter((stat) => !stats.find((curStat) => curStat.name === stat));
      setStats([...stats, ...getDefaultStats(newDefaultStats)]);
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
               <div className={cssClasses.modalWrapper}>{addAdditionalActivity ?
                  <StatSelector onFieldSelectorClosed={handleSetAdditionalFields}
                                alreadyChosenFields={stats.map((stat) => stat.name)}/> :
                  <StatAdder setActivityName={setActivityName} activityName={activityName}
                             onAddAdditionalStats={() => setAddAdditionalAcitivity(true)}
                             onHandleStatDeletion={handleDeleteSelectedField} stats={stats.map((stat) => stat.name)}
                             onSetStats={handleSetAddedStats}
                             onCreation={handleCreation}
                  />}</div>
            </Modal>
         )}
      </>
   );
};
