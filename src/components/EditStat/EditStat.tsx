import {StatEnumType} from "../../activitiesAssembly/stats";
import {Button} from "@mui/material";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Input} from "../Input/Input";
import {useState} from "react";

interface IEditStatProps {
   name?: StatEnumType
   onEditConfirmed: () => void;
}

const cssClasses = getClasses(styles);
export const EditStat = ({name, onEditConfirmed}: IEditStatProps) => {
   const [activityName, setActivityName] = useState("")
   return <>
      <div><strong>Editing {activityName}</strong><br/>
         <small>Note: This change is only affecting the stat for this activity.</small>
      </div>
      <div className={cssClasses.fields}>
         Fields
         <Input label={"Stat name"} onChange={setActivityName}/>
         <Input label={"Stat name"} onChange={setActivityName}/>
         <Input label={"Stat name"} onChange={setActivityName}/>

      </div>
      <Button
         sx={{margin: "auto", width: "fit-content"}}
         size={"small"}
         variant="outlined"
         onClick={onEditConfirmed}>Confirm changes</Button>
   </>
}