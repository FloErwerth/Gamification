import React, {useCallback, useContext, useState} from "react";
import {PredefinedActivities} from "../../../../activitiesAssembly/predefinedActivities";
import {ActivityAssembly} from "../../../../activitiesAssembly/activityAssembly";
import {WithHelpText} from "../../../../hoc/WithHelpText/WithHelpText";
import {AutoComplete} from "../../../AutocompleteItem/AutoComplete";
import {getCategory} from "../../../../activitiesAssembly/categories";
import {Button} from "@mui/material";
import {AddCircle, ClearAllRounded} from "@mui/icons-material";
import {ActivityAdderModalContentProps} from "../../ActivityAdder";
import {getClasses} from "../../../../utils/styleUtils";
import {activityAdderClasses} from "../../styles";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {ActivityAdderContext} from "../../ActivityAdderContext/ActivityAdderContext";

const cssClasses = getClasses(activityAdderClasses);



export const StatOverview = ({
                                onAddAdditionalStats,
                                onCreation,
                             }: ActivityAdderModalContentProps) => {
   const {
      stats,
      setEditedStat,
      setEditStat, clearStats
   } = useContext(ActivityAdderContext);

   return (
      <>
         <div className={cssClasses.fieldsContainer}>
            <div className={cssClasses.fieldsOuterWrapper}>
            </div>
            <div className={cssClasses.buttons}>
               <Button startIcon={<AddCircle/>} onClick={() => onAddAdditionalStats(true)} color={"primary"}>Add
                  stat</Button>{stats && stats.length > 0 &&
                <Button onClick={clearStats} startIcon={<ClearAllRounded/>}>Clear all stats</Button>}
            </div>
         </div>
         <Button variant={"contained"} onClick={onCreation}>Create Activity</Button></>
   );
};