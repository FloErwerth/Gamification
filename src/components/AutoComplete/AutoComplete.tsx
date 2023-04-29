import {useStringFilter} from "../../utils/usePropsFilter";
import {KeyboardEvent, useCallback, useMemo, useState} from "react";
import {Input, LabelMode} from "../Input/Input";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useArrowNavigation} from "./useArrowNavigation";

interface IAutoComplete<Options extends string[]> {
   options: Options;
   onChosenOption: (value: Options[number]) => void;
}

const cssClasses = getClasses(styles);

export function AutoComplete<Options extends string[]>({options, onChosenOption}: IAutoComplete<Options>) {
   const {filteredArray, setFilter, filter} = useStringFilter(options);
   const [showDropdown, setShowDropdown] = useState(false);

   const handleSelect = useCallback((index: number) => {
      setFilter(filteredArray[index]);
      setShowDropdown(false);
   }, [filteredArray])

   const [selectIndex, handleNavigation] = useArrowNavigation(filteredArray, handleSelect);

   const handleChosenOption = useCallback((value: Options[number]) => {
      setShowDropdown(false);
      setFilter(value);
      onChosenOption(value);
   }, [onChosenOption])

   const handleChange = useCallback((value: string) => {
      setFilter(value);
   }, [setFilter])

   const handleOpenWithKey = useCallback((e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "enter" && !showDropdown) {
         setFilter("");
         setShowDropdown(true);
      }
   }, [showDropdown])

   const highlight = useCallback((option: string) => {
      return option.split("").map((value) => filter.toLowerCase().includes(value.toLowerCase()) ? <b>{value}</b> : value
      );
   }, [filter])

   const dropdownList = useMemo(() => {
      const dropdown = document.getElementById("dropdown");
      return (filteredArray).map((option, index) => {
            const currentElement = document.getElementById(selectIndex.toString());
            if ((currentElement?.getBoundingClientRect().bottom ?? 0) > (dropdown?.getBoundingClientRect().bottom ?? 1)) {
               currentElement?.scrollIntoView({
                  behavior: "smooth",
                  inline: "end",
               })
            }
            if ((currentElement?.getBoundingClientRect().top ?? 1) < (dropdown?.getBoundingClientRect().top ?? 0)) {
               currentElement?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
               })
            }
            return <li>
               <button id={index.toString()} style={{backgroundColor: index === selectIndex ? "lightgray" : ""}}
                       className={cssClasses.dropdownItem}
                       onClick={() => handleChosenOption(option)}>{highlight(option)}
               </button>
            </li>
         }
      )
   }, [filteredArray, selectIndex]);

   return <div className={cssClasses.wrapper} onKeyDown={handleOpenWithKey}
               onBlur={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setTimeout(() => setShowDropdown(false), 100)
               }}>
      <Input onKeyDown={handleNavigation} value={filter}
             onFocus={() => setShowDropdown(true)}
             labelMode={LabelMode.INLINE}
             onChange={handleChange}/>
      {showDropdown && <ul className={cssClasses.dropdownList} id={"dropdown"}>{dropdownList}
      </ul>}
   </div>


}