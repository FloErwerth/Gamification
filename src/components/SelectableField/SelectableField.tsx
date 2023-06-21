import {Stat} from "../../activitiesAssembly/stats";
import {ClickableChip} from "../ActivityManipulator/Components/DisplayedChips/ClickableChip/ClickableChip";

interface ISelectableButton {
   onClick: (value: Stat) => void
   selectableStat: Stat;
}

export const SelectableField = ({onClick, selectableStat}: ISelectableButton) => {

   return <ClickableChip
      onClick={() => onClick(selectableStat)}
      wrapperClasses={{
         ":hover": {
            outline: "1px solid black"
         }
      }}
      stat={selectableStat}/>
}