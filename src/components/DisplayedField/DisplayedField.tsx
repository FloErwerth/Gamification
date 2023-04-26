import {styles} from "./styles";
import {useMemo} from "react";
import {cx} from "@emotion/css";
import {getClasses} from "../../utils/styleUtils";
import {DeleteIcon} from "../../media/icons";
import {Button} from "../Button/Button";
import {Stat, StatEnumType} from "../../activitiesAssembly/stats";

interface IField extends Omit<Stat, "text" | "preferedUnit"> {
   wrapperClasses?: string;
   onDeletion?: (field: StatEnumType) => void;
   showDeleteButton?: boolean,
}

const cssClasses = getClasses(styles);
export const DisplayedField = ({name, description, wrapperClasses, onDeletion, showDeleteButton = true}: IField) => {
   const wrapper = useMemo(() => cx(cssClasses.fieldWrapper, wrapperClasses), [wrapperClasses]);
   return <div className={wrapper}>
      <div>
         <div className={cssClasses.fieldName}>{name}</div>
         <small>{description}</small></div>
      {showDeleteButton &&
          <Button className={cssClasses.deleteButton} onClick={() => onDeletion?.(name)}><DeleteIcon
              className={cssClasses.icon}/>
          </Button>}
   </div>
}