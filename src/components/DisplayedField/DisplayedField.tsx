import {styles} from "./styles";
import {useMemo} from "react";
import {cx} from "@emotion/css";
import {getClasses} from "../../utils/styleUtils";
import {Stat} from "../../store/activities/predefinedActivities";
import {DeleteIcon} from "../../media/icons";
import {Button} from "../Button/Button";

interface IField extends Omit<Stat, "text" | "preferedUnit"> {
   wrapperClasses?: string;
   onDeletion?: (field: Omit<Stat, "text" | "preferedUnit">) => void;
}

const cssClasses = getClasses(styles);
export const DisplayedField = ({name, description, wrapperClasses, deletable, onDeletion}: IField) => {
   const wrapper = useMemo(() => cx(cssClasses.fieldWrapper, wrapperClasses), [wrapperClasses]);
   return <div className={wrapper}>
      <div>
         <div className={cssClasses.fieldName}>{name}</div>
         <small>{description}</small></div>
      {deletable &&
          <Button className={cssClasses.deleteButton} onClick={() => onDeletion?.({name, description})}><DeleteIcon
              className={cssClasses.icon}/>
          </Button>}
   </div>
}