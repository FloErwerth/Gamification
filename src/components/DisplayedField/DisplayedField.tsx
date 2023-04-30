import {useMemo} from "react";
import {Stat, StatEnumType} from "../../activitiesAssembly/stats";
import {Chip, SxProps, Theme} from "@mui/material";

interface IField extends Omit<Stat, "text" | "preferedUnit"> {
   wrapperClasses?: SxProps<Theme>;
   onDeletion?: (field: StatEnumType) => void;
   showDeleteButton?: boolean,
   unit?: string,
   onClick?: () => void;
}

export const DisplayedField = ({
                                  name,
                                  wrapperClasses,
                                  onDeletion,
                                  onClick,
                                  unit = "",
                                  showDeleteButton = true
                               }: IField) => {


   const chipProps = useMemo(() => {
      return {label: name, onDelete: onDeletion ? onDeletion : undefined, onClick}
   }, [onDeletion, name])

   return <Chip sx={wrapperClasses} {...chipProps} />
}