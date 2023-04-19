import {useCallback, useState} from "react";
import {Stat, StatEnum, StatMap} from "../../store/activities/predefinedActivities";
import {Modal, ModalProps} from "../Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableField} from "../SelectableField/SelectableField";

interface IFieldsSelector extends ModalProps {
   onFieldSelectorClosed: (fields: Stat[]) => void;
   alreadyChosenFields?: Stat[];
}

const getAvailableFields = (alreadyAdded: Stat[] | undefined) => {
   if (!alreadyAdded || alreadyAdded.length === 0) {
      return StatEnum.options;
   }
   return StatEnum.options.filter((option) => !alreadyAdded.find((addedOption) => option === addedOption.name))
}
const cssClasses = getClasses(styles);

export const FieldsSelector = ({onFieldSelectorClosed, open, alreadyChosenFields}: IFieldsSelector) => {
   const [selectedFields, setSelectedFields] = useState<Stat[]>([]);
   const handleSelection = useCallback((value: Stat, selected: boolean) => {
      if (selected) {
         setSelectedFields((fields) => {
            fields.splice(selectedFields.findIndex((field) => field.name === value.name))
            return [...fields];
         })
      } else {
         const selectableField: Stat = {...value, deletable: true};
         setSelectedFields((fields) => [...fields, selectableField]);
      }
   }, [selectedFields]);

   return <Modal open={open}
                 onClose={() => onFieldSelectorClosed(selectedFields)}>

      <h3>Select fields from below to add to your activity</h3>
      <div
         className={cssClasses.fieldsWrapper}>{getAvailableFields(alreadyChosenFields).map((field) => {
         const parsedField = StatMap(field as StatEnum);
         return <SelectableField selectableValue={parsedField}
                                 onClick={handleSelection}/>
      })}
      </div>
   </Modal>
}