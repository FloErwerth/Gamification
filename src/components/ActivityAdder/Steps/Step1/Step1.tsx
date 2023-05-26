import React, {useContext, useMemo, useState} from "react";
import {PredefinedActivities} from "../../../../activitiesAssembly/predefinedActivities";
import {AutoComplete} from "../../../AutocompleteItem/AutoComplete";
import {getCategory} from "../../../../activitiesAssembly/categories";
import {WithHelpText} from "../../../../hoc/WithHelpText/WithHelpText";
import {ActivityAdderContext} from "../../ActivityAdderContext/ActivityAdderContext";
import {DisplayedField} from "../../Components/DisplayedField/DisplayedField";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableChip} from "../../../SelectableChip/SelectableChip";
const cssClasses = getClasses(styles);
export const Step1 = () => {
    const {errorInfo,setActivitiyName, activityName, stats, defaultDays, selectedDays, setSelectedDays} = useContext(ActivityAdderContext);

    return <div className={cssClasses.wrapper}>
        <WithHelpText position={"end"} placement={"right"} helpText={"By choosing an predefinied activity stats will automatically be added. You can delete or edit them in the next step."}>
            <AutoComplete
                onInputChange={(input) => setActivitiyName?.(input)}
                label={"Activity Name"}
                value={activityName}
                options={PredefinedActivities.options}
                groupBy={(option) => getCategory(option)}
                onActivityChange={(value) => setActivitiyName?.(value)}
            />
        </WithHelpText>
        {errorInfo?.hasError && <small>{errorInfo.errorMessage}</small>}
        {activityName && <div className={cssClasses.outerWrapper}><small>Select weekdays to do the activity. <br/>Note: If no weekday is selected, the activity counts for every weekday.</small>
        <div className={cssClasses.daysWrapper}>{defaultDays?.map((day) =>
            <SelectableChip
                selected={selectedDays?.includes(day) ?? false}
                value={day} onClick={(day) => setSelectedDays?.(day)}
                label={day}></SelectableChip>)}</div>

        </div>}
    </div>

}