import {useCallback, useState} from "react";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {StatEnumType} from "../../activitiesAssembly/stats";

interface ISelectableButton {
   onClick: (value: StatEnumType, selected: boolean) => void
   selectableStat: StatEnumType;
}

export const SelectableField = ({onClick, selectableStat}: ISelectableButton) => {
   const [selected, setSelected] = useState(false);

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
      name={selectableStat}
      showDeleteButton={false}/>
}