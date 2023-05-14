import {useCallback, useMemo, useState} from "react";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {StatEnumType, StatMap} from "../../activitiesAssembly/stats";

interface ISelectableButton {
   onClick: (value: StatEnumType, selected: boolean) => void
   selectableStat: StatEnumType;
}

export const SelectableField = ({onClick, selectableStat}: ISelectableButton) => {
   const [selected, setSelected] = useState(false);
   const mappedSelectableStat = useMemo(() => StatMap(selectableStat), [selectableStat]);
   const cssClasses = useMemo(() => getClasses(styles(selected)), [selected])

   const handleClick = useCallback(() => {
      onClick?.(selectableStat, !selected)
      setSelected((currentlySelected) => !currentlySelected);
   }, [selected])

   return <DisplayedField
      onClick={handleClick}
      wrapperClasses={{
         backgroundColor: selected ? "lightblue" : "", ":hover": {
            backgroundColor: selected ? "lightblue" : "",
            outline: "1px solid black"
         }
      }}
      name={mappedSelectableStat.name}
      showDeleteButton={false}/>
}