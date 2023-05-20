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
import {WithHelpText} from "../../hoc/WithHelpText/WithHelpText";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
   setStats: Dispatch<SetStateAction<StatEnumType[]>>;
   stats: StatEnumType[],
   onHandleSetActivityName: (name: PredefinedActivities | string) => void;
   onHandleStatEdit: (name: StatEnumType) => void;
   onHandleStatDeletion: (name: StatEnumType) => void;
   onAddAdditionalStats: (value: boolean) => void;
   activityName?: string;
}

const StatAdder = ({
                      activityName,
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
            <WithHelpText position={"end"} placement={"right"}
                          helpText={"You can also define your own activity by typing in the name and add stats to it."}><AutoComplete
               onInputChange={onHandleSetActivityName}
               label={"Activity Name"}
               value={activityName}
               options={PredefinedActivities.options}
               groupBy={(option) => getCategory(option)}
               onActivityChange={onHandleSetActivityName}/></WithHelpText>
            <div className={cssClasses.fieldsOuterWrapper}>
               <div
                  className={cssClasses.statsTitle}>{stats.length > 0 &&
                   <small>The following stats will be added to your activity:</small>}</div>
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

   const handleSetAdditionalFields = useCallback((selectedFields: StatEnumType[]) => {
      const newStats = [...stats, ...selectedFields]
      setStats(newStats);
      setAddAdditionalAcitivity(false);
   }, [stats])

   const dispatch = useAppDispatch();
   
   const handleDeleteSelectedField = useCallback((deletedField: StatEnumType) => {
      setStats((prev) => prev.filter((field) => field !== deletedField));
   }, [stats]);

   const handleSetPredefinedActivity = useCallback((name: PredefinedActivities) => {
      if (name !== activityName) {
         const assemblyStats = ActivityAssembly(name).filter((stat) => !stats.includes(stat));
         setActivityName(name);
         setStats([...assemblyStats, ...stats]);
      }
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
                                alreadyChosenFields={stats}/> :
                  <StatAdder activityName={activityName} onAddAdditionalStats={() => setAddAdditionalAcitivity(true)}
                             onHandleStatDeletion={handleDeleteSelectedField} stats={stats} setStats={setStats}
                             onCreation={handleCreation}
                             onHandleSetActivityName={handleSetPredefinedActivity}
                             onHandleStatEdit={(name) => setStatEdit(name)}
                  />}</div>
            </Modal>
         )}
      </>
   );
};
