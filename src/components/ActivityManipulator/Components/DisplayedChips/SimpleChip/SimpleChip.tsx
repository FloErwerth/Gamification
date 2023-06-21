import {SimpleChipProps} from "../types";
import {Chip} from "@mui/material";

export const SimpleChip = ({disabled, wrapperClasses, stat}: SimpleChipProps) => {
    return <Chip disabled={disabled} sx={wrapperClasses} label={stat.statName}/>
}