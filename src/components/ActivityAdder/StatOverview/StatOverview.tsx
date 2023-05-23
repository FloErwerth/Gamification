import {useCallback, useContext} from "react";
import {PredefinedActivities} from "../../../activitiesAssembly/predefinedActivities";
import {ActivityAssembly} from "../../../activitiesAssembly/activityAssembly";
import {WithHelpText} from "../../../hoc/WithHelpText/WithHelpText";
import {AutoComplete} from "../../AutocompleteItem/AutoComplete";
import {getCategory} from "../../../activitiesAssembly/categories";
import {Button} from "@mui/material";
import {AddCircle, ClearAllRounded} from "@mui/icons-material";
import {ActivityAdderModalContentProps} from "../ActivityAdder";
import {getClasses} from "../../../utils/styleUtils";
import {activityAdderClasses} from "../styles";
import {DisplayedField} from "../Components/DisplayedField/DisplayedField";
import {ActivityAdderContext} from "../ActivityAdderContext/ActivityAdderContext";
import {getDefaultStats, Stat} from "../../../activitiesAssembly/stats";

const cssClasses = getClasses(activityAdderClasses);
export const StatOverview = ({
                                setActivityName,
                                activityName,
                                onAddAdditionalStats,
                                onCreation,
                                onSetStats,
                                onHandleStatDeletion,
                             }: ActivityAdderModalContentProps) => {
   const {stats, setEditedStat, setEditStat} = useContext(ActivityAdderContext);

   const handleSetActivityName = useCallback((name: PredefinedActivities) => {
      setActivityName(name);
      if (stats?.length === 0 || name && name !== activityName) {
         const parsedStats = getDefaultStats(ActivityAssembly(name));
         if (stats) {
            onSetStats([...stats, ...parsedStats])
         }
      }
      if (stats?.length === 0 || name && name !== activityName) {

      }
   }, [activityName, stats, ActivityAssembly])

   const handleClearStats = useCallback(() => {
      onSetStats([]);
      if (activityName && PredefinedActivities.options.find((option) => option === activityName)) {
         setActivityName("");
      }
   }, [activityName])

   const handleStatEdit = useCallback((stat: Stat) => {
      setEditStat?.(true);
      setEditedStat?.(stat);
   }, [setEditedStat, setEditedStat])

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
               {stats && <div
                   className={cssClasses.statsTitle}>{stats.length > 0 &&
                   <small>The following stats will be added to your activity:</small>}</div>}
               <div className={cssClasses.fieldsWrapper}>{stats?.map((stat) => {
                     return <DisplayedField stat={stat}
                                            onEdit={handleStatEdit}
                                            onDeletion={onHandleStatDeletion}/>
                  }
               )}</div>

            </div>
            <div className={cssClasses.buttons}>
               <Button startIcon={<AddCircle/>} onClick={() => onAddAdditionalStats(true)} color={"primary"}>Add
                  stat</Button>{stats && stats.length > 0 &&
                <Button onClick={handleClearStats} startIcon={<ClearAllRounded/>}>Clear all stats</Button>}
            </div>

         </div>
         <Button variant={"contained"} onClick={onCreation}>Create Activity</Button></>
   );
};