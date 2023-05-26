import {DisplayedField} from "../ActivityAdder/Components/DisplayedField/DisplayedField";
import {Stat} from "../../activitiesAssembly/stats";

interface ISelectableButton {
   onClick: (value: Stat) => void
   selectableStat: Stat;
}

export const SelectableField = ({onClick, selectableStat}: ISelectableButton) => {

   return <DisplayedField
      onClick={() => onClick(selectableStat)}
      wrapperClasses={{
         ":hover": {
            outline: "1px solid black"
         }
      }}
      stat={selectableStat}
      showDeleteButton={false}/>
}