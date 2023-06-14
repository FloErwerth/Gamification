import {useContext} from "react";
import {Chip} from "@mui/material";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";
import {ActivityManipulatorContext} from "../../ActivityManipulatorContext/ActivityManipulatorContext";

const cssClasses = getClasses(styles);
export const Step3 = () => {
   const {
      activityName,
      selectedDays,
      defaultDays,
      selectedWeekInterval,
      defaultWeekInterval,
      stats
   } = useContext(ActivityManipulatorContext);
   return <div className={cssClasses.wrapper}>
      <strong>The following activity will be created</strong>
      <div>
         <div className={cssClasses.title}>Activity name</div>
         <Chip label={activityName}/></div>
      <div>
         <div className={cssClasses.title}>Weekdays</div>
         {(selectedDays && selectedDays.length > 0 ? selectedDays : defaultDays)?.map((day) =>
            <Chip key={`ActivityManipulatorChipForSelectedDay${day}`} label={day}/>)}</div>
      <div>
         <div className={cssClasses.title}>Weekly interval</div>
         {(selectedWeekInterval && selectedWeekInterval.length > 0 ? selectedWeekInterval : defaultWeekInterval)?.map((weekInterval) =>
            <Chip key={`ActivityManipulatorChipForSelectedWeeklyInterval${weekInterval}`} label={weekInterval}/>)}</div>
      <div>
         <div className={cssClasses.title}>Stats</div>
         {stats?.map((stat) => <Chip key={`ActivityManipulatorChipForStat${stat.statName}`}
                                     sx={{height: 35, borderRadius: 35}}
                                     label={<div>{stat.statName} <br/><small><i>{stat.unit}</i></small>
                                     </div>}/>)}
      </div>

   </div>
}