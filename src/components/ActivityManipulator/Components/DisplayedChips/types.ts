import {Stat} from "../../../../activitiesAssembly/stats";
import {SxProps, Theme} from "@mui/material";


export interface EditableChipProps extends SimpleChipProps{
    onEdit?: (field: Stat) => void;

}
export interface DeleteableChipProps extends SimpleChipProps {
    onDeletion?: (field: Stat) => void;

}
export type DeleteableAndEditableChipProps = SimpleChipProps & EditableChipProps & DeleteableChipProps;

export interface ClickableChipProps extends SimpleChipProps {
    onClick?: () => void;
}
export interface SimpleChipProps {
    stat: Stat
    wrapperClasses?: SxProps<Theme>;
    disabled?: boolean;
}