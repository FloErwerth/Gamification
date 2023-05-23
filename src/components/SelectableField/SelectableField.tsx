import {useCallback, useState} from "react";
import {DisplayedField} from "../ActivityAdder/Components/DisplayedField/DisplayedField";
import {Stat} from "../../activitiesAssembly/stats";

interface ISelectableButton {
   onClick: (value: Stat, selected: boolean) => void
   selectableStat: Stat;
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
      stat={selectableStat}
      showDeleteButton={false}/>
}