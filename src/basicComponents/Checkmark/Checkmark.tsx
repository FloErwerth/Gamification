import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Checkbox as MuiCheckmark, FormControlLabel} from "@mui/material";

const cssClasses = getClasses(styles);

interface CheckmarkProps {
   checked: boolean,
   onToggle?: (value: boolean) => void;
   label?: string;
}

export const Checkmark = ({onToggle, checked, label}: CheckmarkProps) => {
   return (
      <FormControlLabel label={label} control={<MuiCheckmark onChange={() => onToggle?.(checked)}
                                                             checked={checked}/>}/>);
};
