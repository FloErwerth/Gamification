import {useCallback, useState} from "react";
import {Button} from "../basicComponents/Button/Button";
import {Modal} from "../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {Input} from "../basicComponents/Input/Input";
import {Dropdown} from "../basicComponents/Dropdown/Dropdown";
import {useAppDispatch} from "../../store/store";
import {addActivity} from "../../store/activities/acitivityActions";
import {ACTIVITY_INCREASE_TYPES, ACTIVITY_TYPE, ActivityIncrease, ActivityType} from "../../store/activities/types";
import {getInitialMaxValue} from "../../store/activities/util";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
}

const AddActivityModalContent = ({onCreation}: ActivityAdderModalContentProps) => {
   const [activityName, setActivityName] = useState("");
   const [activityType, setActivityType] = useState<ActivityType>("UNDEFINED");
   const [increasement, setIncreasement] = useState<ActivityIncrease>("UNDEFINED");
   const dispatch = useAppDispatch();

   const handleCreation = useCallback(() => {
      if (activityType !== "UNDEFINED" && activityType && activityName) {
         onCreation();
         dispatch(addActivity({
            name: activityName,
            type: activityType,
            increasement,
            maxValue: getInitialMaxValue(activityType)
         }))
      }
   }, [activityType, activityName]);

   return <div className={cssClasses.modalWrapper}>
      <div>Add an activity</div>
      <Input id={"activity_name"} customWrapperClasses={cssClasses.input} label={"Activity Name"}
             onChange={value => setActivityName(value)}
             value={activityName}/>
      <Dropdown
         options={ACTIVITY_TYPE.options.filter((option) => option !== "UNDEFINED")}
         label={"Activity Type"}
         setValue={(value) => setActivityType(ACTIVITY_TYPE.parse(value))}/>
      <Dropdown
         options={ACTIVITY_INCREASE_TYPES.options.filter((option) => option !== "UNDEFINED")}
         label={"Activity Increase"}
         setValue={(value) => setIncreasement(ACTIVITY_INCREASE_TYPES.parse(value))}/>
      <Button onClick={handleCreation}>Create Activity</Button>
   </div>
}

export const ActivityAdder = () => {
   const [showAdderModal, setShowAdderModal] = useState(false);
   return (
      <>
         <Button className={cssClasses.adder} onClick={() => setShowAdderModal(true)}>Add Activity</Button>
         {showAdderModal &&
             <Modal open={showAdderModal} onClose={() => setShowAdderModal(false)}><AddActivityModalContent
                 onCreation={() => setShowAdderModal(false)}/></Modal>}
      </>

   )
}