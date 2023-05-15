import {StatEnumType} from "../../activitiesAssembly/stats";
import {Button} from "@mui/material";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";

interface IEditStatProps {
   name?: StatEnumType
   onEditConfirmed: () => void;
}

const cssClasses = getClasses(styles);
export const EditStat = ({name, onEditConfirmed}: IEditStatProps) => {
   return <>
      <strong>Editing {name}</strong>
      <div></div>
      <Button
         sx={{marginInline: "auto", width: 150}}
         size={"small"}
         variant="outlined"
         onClick={onEditConfirmed}>Confirm
         Edit</Button>
   </>
}