import {useCallback, useState} from "react";

interface Dropdown {
   options: string[];
   label: string;
   setValue: (value: string) => void;
}

export const Dropdown = ({options, label, setValue}: Dropdown) => {
   const [showDropdown, setShowDropdown] = useState(false);
   const [chosenOption, setChosenOption] = useState("");

   const handleOptionSelection = useCallback((value: string) => {
      setValue(value);
      setChosenOption(value);
      setShowDropdown(false);
   }, [setValue]);

   return <>
      <button onClick={() => setShowDropdown(true)}>{label}</button>
      <div>{chosenOption}</div>
      {showDropdown && <ul id={"dropdown"}>{options.map((option) => <li>
         <button onClick={() => handleOptionSelection(option)}>{option}</button>
      </li>)}</ul>}
   </>
}