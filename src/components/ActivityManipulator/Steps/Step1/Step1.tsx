import React, {useContext} from "react";
import {PredefinedActivities} from "../../../../activitiesAssembly/predefinedActivities";
import {AutoComplete} from "../../../AutocompleteItem/AutoComplete";
import {getCategory} from "../../../../activitiesAssembly/categories";
import {WithHelpText} from "../../../../hoc/WithHelpText/WithHelpText";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableChip} from "../../../SelectableChip/SelectableChip";
import {ActivityManipulatorContext} from "../../ActivityManipulatorContext/ActivityManipulatorContext";

const cssClasses = getClasses(styles);
export const Step1 = () => {
   const {
      setActivityName,
      activityName,
      defaultDays,
      selectedDays,
      defaultWeekInterval, selectedWeekInterval, setWeekInterval,
      setSelectedDays
   } = useContext(ActivityManipulatorContext);

   return <div className={cssClasses.wrapper}>
      <WithHelpText position={"end"} placement={"right"}
                    helpText={"By choosing an predefinied activity stats will automatically be added. You can delete or edit them in the next step."}>
         <AutoComplete
            onInputChange={(input) => setActivityName?.(input)}
            label={"Activity Name"}
            value={activityName}
            options={PredefinedActivities.options}
            groupBy={(option) => getCategory(option)}
            onActivityChange={(value) => setActivityName?.(value)}
         />
      </WithHelpText>
      {activityName &&
          <div className={cssClasses.outerWrapper}><small>Select weekdays to do the activity</small>
              <div className={cssClasses.daysWrapper}>{defaultDays?.map((day) =>
                 <SelectableChip
                    selected={selectedDays?.includes(day) ?? false}
                    value={day} onClick={(day) => setSelectedDays?.(day)}
                    label={day}></SelectableChip>)}</div>
          </div>}
      {activityName &&
          <div className={cssClasses.outerWrapper}><small>Select a week interval for the activity</small>
              <div className={cssClasses.daysWrapper}>{defaultWeekInterval?.map((week) =>
                 <SelectableChip
                    selected={selectedWeekInterval?.includes(week) ?? false}
                    value={week} onClick={(week) => setWeekInterval?.(week)}
                    label={week}></SelectableChip>)}</div>
          </div>}
   </div>

}