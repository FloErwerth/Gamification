import {useCallback, useState} from "react";
import {StatEnum} from "../../store/activities/predefinedActivities";
import {Modal, ModalProps} from "../Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {SelectableField} from "../SelectableField/SelectableField";

interface IFieldsSelector extends ModalProps {
   onFieldSelectorClosed: (fields: StatEnum[]) => void;
   alreadyChosenFields?: StatEnum[];
}

const getAvailableFields = (alreadyAdded: StatEnum[] | undefined) => {
   if (!alreadyAdded || alreadyAdded.length === 0) {
      return StatEnum.options;
   }
   return StatEnum.options.filter((option) => !alreadyAdded.find((addedOption) => option === addedOption))
}
const cssClasses = getClasses(styles);

export const FieldsSelector = ({onFieldSelectorClosed, open, alreadyChosenFields}: IFieldsSelector) => {
   const [selectedFields, setSelectedFields] = useState<StatEnum[]>([]);
   const handleSelection = useCallback((value: StatEnum, selected: boolean) => {
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

      <h3>Select fields from below to add to your activity</h3>
      <div
         className={cssClasses.fieldsWrapper}>{getAvailableFields(alreadyChosenFields).map((field) => {
         return <SelectableField selectableStat={field}
                                 onClick={handleSelection}/>
      })}
      </div>
   </Modal>
}