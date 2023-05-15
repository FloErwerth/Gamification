import {useCallback, useMemo, useState} from "react";

import {ModalProps} from "../../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableField} from "../SelectableField/SelectableField";
import {StatEnum, StatEnumType} from "../../activitiesAssembly/stats";
import {ActivityCategory, MapCategoryToStats, TActivityCategory} from "../../activitiesAssembly/categories";
import {Button} from "@mui/material";
import {AutoComplete} from "../AutocompleteItem/AutoComplete";
import {DisplayedField} from "../DisplayedField/DisplayedField";

interface IFieldsSelector extends ModalProps {
   onFieldSelectorClosed: (fields: StatEnumType[]) => void;
   alreadyChosenFields?: StatEnumType[];
}

const getAvailableFields = (filter: TActivityCategory, alreadyAdded: StatEnumType[] | undefined, handleSelection: (value: StatEnumType, selected: boolean) => void): { shownElements: JSX.Element[], hiddenElements: JSX.Element[] } => {
   const shownOptionsFields = MapCategoryToStats(filter).options;
   const hiddenOptions = StatEnum.options.filter((option) => !Array.from(shownOptionsFields).includes(option) || alreadyAdded?.includes(option)).map((field) =>
      <DisplayedField disabled={true} name={field}/>)
   return {
      shownElements: shownOptionsFields.map((field) => <SelectableField onClick={handleSelection}
                                                                        selectableStat={field}/>),
      hiddenElements: hiddenOptions
   }
}
const cssClasses = getClasses(styles);

export const StatSelector = ({onFieldSelectorClosed, open, alreadyChosenFields}: IFieldsSelector) => {
   const [selectedFields, setSelectedFields] = useState<StatEnumType[]>([]);
   const [filter, setFilter] = useState<TActivityCategory>("All");

   const handleSelection = useCallback((value: StatEnumType, selected: boolean) => {
      if (!selected) {
         setSelectedFields((fields) => {
            fields.splice(selectedFields.findIndex((field) => field === value))
            return [...fields];
         })
      } else {
         setSelectedFields((fields) => [...fields, value]);
      }
   }, [selectedFields]);

   const fields = useMemo(() => getAvailableFields(filter, alreadyChosenFields, handleSelection), [filter, alreadyChosenFields, handleSelection]);


   return <>
      <AutoComplete label={"Category"} options={ActivityCategory.options}
                    onInputChange={(value) => !value && setFilter("All")}
                    onActivityChange={(category) => {
                       setFilter(category)
                    }}/>
      <div className={cssClasses.fieldsOuterWrapper}>
         <div
            className={cssClasses.fieldsWrapper}>{fields.shownElements}</div>
         <div className={cssClasses.fieldsWrapper}>{fields.hiddenElements}</div>
      </div>
      <Button variant={"contained"} onClick={() => onFieldSelectorClosed(selectedFields)}>Confirm selection</Button>
   </>
}