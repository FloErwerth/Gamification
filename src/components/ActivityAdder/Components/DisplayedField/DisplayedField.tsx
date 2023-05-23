import {Stat} from "../../../../activitiesAssembly/stats";
import {Chip, SxProps, Theme} from "@mui/material";
import {getUnitOptions} from "../../../../activitiesAssembly/units";
import {useMemo} from "react";
import {getClasses} from "../../../../utils/styleUtils";
import {editableStyles} from "./styles";

interface IField {
   stat: Stat
   wrapperClasses?: SxProps<Theme>;
   onClick?: () => void;
   onEdit?: (field: Stat) => void;
   onDeletion?: (field: Stat) => void;
   showDeleteButton?: boolean,
   disabled?: boolean;
}

//transfer ActivityAdder to complete context
const editableChipClasses = getClasses(editableStyles);
export const DisplayedField = ({
                                  stat,
                                  wrapperClasses,
                                  onDeletion,
                                  onEdit,
                                  onClick,
                                  disabled = false
                               }: IField) => {

   const unitOptions = useMemo(() => getUnitOptions(stat.name), [stat]);

   if (onDeletion && unitOptions && onEdit) {
      return <Chip sx={{outline: "1px solid lightgreen"}} onClick={() => onEdit(stat)}
                   classes={{root: editableChipClasses.root, label: editableChipClasses.editableChipLabel}} label={<>
         <div>Edit</div>
         <div>{stat.name}</div>
      </>}
                   onDelete={() => onDeletion(stat)}/>
   }

   if (onDeletion) {
      return <Chip sx={wrapperClasses}
                   label={stat.name}
                   onDelete={() => onDeletion(stat)}/>
   }

   return <Chip disabled={disabled} sx={wrapperClasses} onClick={onClick} label={stat.name}/>
}