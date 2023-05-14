import {useCallback, useState} from "react";

import {Modal, ModalProps} from "../../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableField} from "../SelectableField/SelectableField";
import {StatEnum, StatEnumType} from "../../activitiesAssembly/stats";
import {Button} from "@mui/material";
import {useStringFilter} from "../../utils/usePropsFilter";
import {Input} from "../Input/Input";

interface IFieldsSelector extends ModalProps {
   onFieldSelectorClosed: (fields: StatEnumType[]) => void;
   alreadyChosenFields?: StatEnumType[];
}

const getAvailableFields = (alreadyAdded: StatEnumType[] | undefined) => {
   const options = StatEnum.options;
   if (!alreadyAdded || alreadyAdded.length === 0) {
      return options;
   }
   return options.filter((option) => !alreadyAdded.find((addedOption) => option === addedOption))
}
const cssClasses = getClasses(styles);

export const StatSelector = ({onFieldSelectorClosed, open, alreadyChosenFields}: IFieldsSelector) => {
   const [selectedFields, setSelectedFields] = useState<StatEnumType[]>([]);
   const [filteredArray, _, setFilter] = useStringFilter(getAvailableFields(alreadyChosenFields));

   const handleSelection = useCallback((value: StatEnumType, selected: boolean) => {
      if (selected) {
         setSelectedFields((fields) => {
            fields.splice(selectedFields.findIndex((field) => field === value))
            return [...fields];
         })
      } else {
         setSelectedFields((fields) => [...fields, value]);
      }
   }, [selectedFields]);


   return <Modal open={open}
                 onClose={() => onFieldSelectorClosed(selectedFields)}>
      <div className={cssClasses.wrapper}>
         <div className={cssClasses.filterWrapper}><Input label={"Filter by"} onChange={(value) => setFilter(value)}/>
         </div>
         <div className={cssClasses.fieldsOuterWrapper}>
            <div
               className={cssClasses.selectableFieldsWrapper}>{filteredArray.map((field) => {
               return <SelectableField selectableStat={field}
                                       onClick={handleSelection}/>
            })}</div>
         </div>
         <Button variant={"contained"} onClick={() => onFieldSelectorClosed(selectedFields)}>Confirm selection</Button>
      </div>
   </Modal>
}