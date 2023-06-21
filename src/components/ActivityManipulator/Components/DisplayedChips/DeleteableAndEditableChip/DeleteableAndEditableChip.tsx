import {Chip} from "@mui/material";
import {getClasses} from "../../../../../utils/styleUtils";
import {editableStyles} from "../styles";
import {DeleteableAndEditableChipProps} from "../types";

const editableChipClasses = getClasses(editableStyles);

export const DeleteableAndEditableChip = ({onEdit, onDeletion, stat}: DeleteableAndEditableChipProps) => {
    return <Chip sx={{outline: "1px solid pink"}} onClick={() => onEdit?.(stat)}
                        classes={{root: editableChipClasses.root, label: editableChipClasses.editableChipLabel}} label={<>
        <div>Edit</div>
        <div>{stat.statName}</div>
    </>}
                        onDelete={() => onDeletion?.(stat)}/>
}