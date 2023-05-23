import {Chip} from "@mui/material";
import {useCallback, useMemo} from "react";
import {styles} from "./styles";

interface SelectableChipProps<T> {
   value: T;
   selected: boolean;
   label: string;
   onClick: (value: T) => void
}

export function SelectableChip<T>({selected, onClick, value, label}: SelectableChipProps<T>) {

   const handleClick = useCallback(() => {
      onClick(value);
   }, [onClick])

   const memoizedStyles = useMemo(() => styles(selected), [selected]);

   return <Chip sx={{...memoizedStyles}} label={label}
                onClick={handleClick}></Chip>
}