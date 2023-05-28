import {Stat} from "../../activitiesAssembly/stats";
import {DisplayedField} from "../ActivityManipulator/Components/DisplayedField/DisplayedField";

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