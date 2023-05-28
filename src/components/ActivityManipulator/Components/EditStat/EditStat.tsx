import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";
import {useContext} from "react";
import {ActivityAdderContext} from "../../ActivityAdderContext/ActivityAdderContext";
import {getUnitOptions} from "../../../../activitiesAssembly/units";


const cssClasses = getClasses(styles);
export const EditStat = () => {
   const {editedStat, handleEditedStat} = useContext(ActivityAdderContext);
   const options = getUnitOptions(editedStat?.name);


   return <div className={cssClasses.wrapper}>
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
               onChange={(e) => handleEditedStat?.(e.target.value)}
            >
               {options?.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
         </FormControl>
      </div>
   </div>
}