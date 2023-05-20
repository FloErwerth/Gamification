import {StatEnumType} from "../../activitiesAssembly/stats";
import {Chip, SxProps, Theme} from "@mui/material";

interface IField {
   name: StatEnumType
   wrapperClasses?: SxProps<Theme>;
   onClick?: () => void;
   onEdit?: (field: StatEnumType) => void;
   onDeletion?: (field: StatEnumType) => void;
   showDeleteButton?: boolean,
   disabled?: boolean;
}

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
         label={<>{name}</>}
         onDelete={() => onDeletion(name)}/>
   }

   if (onDeletion) {
      return <Chip sx={wrapperClasses} label={name} onDelete={() => onDeletion(name)}/>
   }

   return <Chip disabled={disabled} sx={wrapperClasses} onClick={onClick} label={name}/>
}