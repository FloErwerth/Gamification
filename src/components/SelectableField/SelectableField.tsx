import {useCallback, useMemo, useState} from "react";
import {Button} from "../Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {Stat} from "../../store/activities/predefinedActivities";
import {css} from "@emotion/css";

interface ISelectableButton {
   onClick: (value: Stat, selected: boolean) => void
   selectableValue: Stat;
}

export const SelectableField = ({onClick, selectableValue}: ISelectableButton) => {
   const [selected, setSelected] = useState(false);
   const cssClasses = useMemo(() => getClasses(styles(selected)), [selected])
   const handleClick = useCallback(() => {
      onClick?.(selectableValue, selected)
      setSelected((currentlySelected) => !currentlySelected);
   }, [selected])
   return <Button onClick={handleClick} className={cssClasses.button}><DisplayedField
      wrapperClasses={css({outline: "none"})}
      name={selectableValue.name}
      description={selectableValue.description}/></Button>
}