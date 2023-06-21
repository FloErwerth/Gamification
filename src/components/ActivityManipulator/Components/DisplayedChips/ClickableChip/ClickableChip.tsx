import {ClickableChipProps} from "../types";
import {Chip} from "@mui/material";

export const ClickableChip = ({disabled, wrapperClasses, onClick,stat}: ClickableChipProps) => {
    return <Chip disabled={disabled} sx={wrapperClasses} onClick={onClick} label={stat.statName}/>
}