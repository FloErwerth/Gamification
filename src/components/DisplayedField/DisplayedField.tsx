import {Stat, StatEnumType} from "../../activitiesAssembly/stats";
import {Chip, SxProps, Theme} from "@mui/material";

interface IField extends Omit<Stat, "text" | "preferedUnit"> {
   wrapperClasses?: SxProps<Theme>;
   onClick?: () => void;
   onDeletion?: (field: StatEnumType) => void;
   showDeleteButton?: boolean,
}

export const DisplayedField = ({
                                  name,
                                  wrapperClasses,
                                  onDeletion,
                                  onClick,
                               }: IField) => {

   if (onDeletion) {
      return <Chip sx={wrapperClasses} label={name} onDelete={() => onDeletion(name)}/>
   }

   return <Chip sx={wrapperClasses} onClick={onClick} label={name}/>
}