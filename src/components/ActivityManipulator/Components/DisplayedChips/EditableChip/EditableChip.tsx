import {getClasses} from "../../../../../utils/styleUtils";
import {editableStyles} from "../styles";
import {EditableChipProps} from "../types";
import {Chip} from "@mui/material";

const editableChipClasses = getClasses(editableStyles);

export const EditableChip = ({onEdit, stat}:EditableChipProps) => {

        return <Chip sx={{outline: "1px solid pink"}} onClick={() => onEdit?.(stat)}
                     classes={{root: editableChipClasses.root, label: editableChipClasses.editableChipLabel}} label={<>
            <div>Edit</div>
            <div>{stat.statName}</div>
        </>}/>
}