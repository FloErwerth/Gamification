import {useCallback, useMemo, useState} from "react";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useToggle} from "../../utils/useToggle";
import {ArrowFilled} from "../../media/icons";

interface Dropdown {
   options: string[];
   label: string;
   setValue: (value: string) => void;
   value?: string;
}


export function Dropdown({options, label, setValue, value}: Dropdown) {

   const {value: showDropdown, toggleValue: toggleDropdown} = useToggle(false);
   const [chosenOption, setChosenOption] = useState(value ?? "");
   const cssClasses = useMemo(() => getClasses(styles(showDropdown, !!chosenOption)), [showDropdown]);

   const handleOptionSelection = useCallback((value: string) => {
      setValue(value);
      setChosenOption(value);
      toggleDropdown(false);
   }, [setValue]);

   return <div className={cssClasses.dropdownWrapper}>
      <button className={cssClasses.toggle}
              onClick={() => toggleDropdown()}>{!chosenOption ? label : chosenOption}<ArrowFilled
         className={cssClasses.icon}/></button>
      {showDropdown &&
          <ul className={cssClasses.dropdownList} id={"dropdown"}>{(options).map((option) =>
             <li>
                <button className={cssClasses.dropdownItem}
                        onClick={() => handleOptionSelection(option)}>{option}</button>
             </li>)}</ul>}
   </div>
}