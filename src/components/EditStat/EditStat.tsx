import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useCallback, useContext} from "react";
import {ActivityAdderContext} from "../ActivityAdder/ActivityAdderContext/ActivityAdderContext";
import {getUnitOptions, Unit} from "../../activitiesAssembly/units";

const cssClasses = getClasses(styles);
export const EditStat = () => {
   const {editedStat, setEditStat, setEditedStat} = useContext(ActivityAdderContext);
   const options = getUnitOptions(editedStat?.name);

   const handleConfirmEdit = useCallback(() => {
      setEditStat?.(false);
   }, [setEditStat]);

   const handleCancelEdit = useCallback(() => {
      setEditStat?.(false);
   }, [setEditStat]);

   const handleStatEdit = useCallback((unit: Unit) => {
      if (editedStat) {
         setEditedStat?.(() => {
            return {...editedStat, preferedUnit: unit}
         })
      }
   }, [editedStat, setEditedStat]);

   return <>
      <div><strong>Editing {editedStat?.name}</strong><br/>
         <small>Note: This change is only affecting the stat for this activity.</small>
      </div>
      <div className={cssClasses.fields}>
         <FormControl fullWidth>
            <InputLabel id="options-label">Unit</InputLabel>
            <Select
               size="small"
               labelId="options-label"
               id="options-select"
               value={editedStat?.preferedUnit}
               label="Age"
               onChange={(e) => handleStatEdit(e.target.value)}
            >
               {options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
         </FormControl>
      </div>
      <div className={cssClasses.buttons}><Button
         sx={{margin: "auto", width: "fit-content"}}
         size={"small"}
         variant="outlined"
         onClick={handleConfirmEdit}>Confirm changes</Button>
         <Button
            sx={{margin: "auto", width: "fit-content"}}
            size={"small"}
            variant="outlined"
            onClick={handleCancelEdit}>Cancel</Button></div>
   </>
}