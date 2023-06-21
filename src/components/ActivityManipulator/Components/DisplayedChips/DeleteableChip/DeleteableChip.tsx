import {Chip} from "@mui/material";
import {DeleteableChipProps} from "../types";

export const DeleteableChip = ({wrapperClasses, stat, onDeletion}:DeleteableChipProps) => {
    return <Chip sx={wrapperClasses}
                 label={stat.statName}
                 onDelete={() => onDeletion?.(stat)}/>
}