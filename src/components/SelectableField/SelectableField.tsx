import {useCallback, useMemo, useState} from "react";
import {Button} from "../Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {StatEnum, StatMap} from "../../store/activities/predefinedActivities";
import {css} from "@emotion/css";

interface ISelectableButton {
   onClick: (value: StatEnum, selected: boolean) => void
   selectableStat: StatEnum;
}

export const SelectableField = ({onClick, selectableStat}: ISelectableButton) => {
   const [selected, setSelected] = useState(false);
   const mappedSelectableStat = useMemo(() => StatMap(selectableStat), [selectableStat]);
   const cssClasses = useMemo(() => getClasses(styles(selected)), [selected])
   const handleClick = useCallback(() => {
      onClick?.(selectableStat, selected)
      setSelected((currentlySelected) => !currentlySelected);
   }, [selected])
   return <Button onClick={handleClick} className={cssClasses.button}><DisplayedField
      wrapperClasses={css({outline: "none"})}
      name={mappedSelectableStat.name}
      description={mappedSelectableStat.description}/></Button>
}