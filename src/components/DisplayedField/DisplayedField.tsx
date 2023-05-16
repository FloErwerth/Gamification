import {Stat, StatEnumType} from "../../activitiesAssembly/stats";
import {Chip, SxProps, Theme} from "@mui/material";
import {editableStyles} from "./styles";
import {getClasses} from "../../utils/styleUtils";

interface IField extends Omit<Stat, "text" | "preferedUnit"> {
   wrapperClasses?: SxProps<Theme>;
   onClick?: () => void;
   onEdit?: (field: StatEnumType) => void;
   onDeletion?: (field: StatEnumType) => void;
   showDeleteButton?: boolean,
   disabled?: boolean;
}

const chipStyles = getClasses(editableStyles);
export const DisplayedField = ({
                                  name,
                                  wrapperClasses,
                                  onDeletion,
                                  onEdit,
                                  onClick,
                                  disabled = false
                               }: IField) => {
   if (onDeletion && onEdit) {
      return <Chip
         classes={{root: chipStyles.root, label: chipStyles.editableChipLabel}} label={<>
         <div className={chipStyles.editableChip} onClick={() => onEdit(name)}>Edit</div>
         <span>{name}</span></>}
         onDelete={() => onDeletion(name)}/>
   }

   if (onDeletion) {
      return <Chip sx={wrapperClasses} label={name} onDelete={() => onDeletion(name)}/>
   }

   return <Chip disabled={disabled} sx={wrapperClasses} onClick={onClick} label={name}/>
}