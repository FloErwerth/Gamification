import {useCallback, useContext, useMemo, useState} from "react";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableField} from "../../../SelectableField/SelectableField";
import {getDefaultStats, Stat, StatEnum} from "../../../../activitiesAssembly/stats";
import {ActivityCategory, MapCategoryToStats, TActivityCategory} from "../../../../activitiesAssembly/categories";
import {Button} from "@mui/material";
import {AutoComplete} from "../../../AutocompleteItem/AutoComplete";
import {DisplayedField} from "../DisplayedField/DisplayedField";
import {getDefaultStat} from "../../../../activitiesAssembly/units";
import {ActivityAdderContext} from "../../ActivityAdderContext/ActivityAdderContext";

interface IFieldsSelector {
   onFieldSelectorClosed: (fields: Stat[]) => void;
   alreadyChosenFields?: Stat[];
}

const getAvailableFields = (filter: TActivityCategory, alreadyAdded: Stat[] | undefined, handleSelection: (value: Stat, selected: boolean) => void): { shownElements: JSX.Element[], hiddenElements: JSX.Element[] } => {
   const shownOptionsFields = getDefaultStats(MapCategoryToStats(filter).options.filter((option) => !alreadyAdded?.find((stat) => stat.name === option)));
   const hiddenOptions = StatEnum.options.filter((option) => {
      return !Array.from(shownOptionsFields).find((stat) => stat.name !== option) || alreadyAdded?.find((stat) => stat.name === option)
   }).map((field) =>
      <DisplayedField disabled={true} stat={getDefaultStat(field)}/>)
   return {
      shownElements: shownOptionsFields.map((field) => <SelectableField onClick={handleSelection}
                                                                        selectableStat={field}/>),
      hiddenElements: hiddenOptions
   }
}
const cssClasses = getClasses(styles);

export const StatSelector = ({onFieldSelectorClosed}: IFieldsSelector) => {
   const [selectedFields, setSelectedFields] = useState<Stat[]>([]);
   const {stats: alreadyChosenFields} = useContext(ActivityAdderContext);
   const [filter, setFilter] = useState<TActivityCategory>("All");
   const handleSelection = useCallback((value: Stat, selected: boolean) => {
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