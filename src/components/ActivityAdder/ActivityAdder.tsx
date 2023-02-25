import {useCallback, useState} from "react";
import {Button} from "../basicComponents/Button/Button";
import {Modal} from "../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {Input} from "../basicComponents/Input/Input";
import {Dropdown} from "../basicComponents/Dropdown/Dropdown";
import {enumToObjectMapper} from "../../utils/enumToObjectMapper";
import {useAppDispatch} from "../../store/store";
import {addActivity} from "../../store/activities/acitivityActions";
import {ACTIVITY_TYPE, ActivityType} from "../../store/activities/types";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
}

const AddActivityModalContent = ({onCreation}: ActivityAdderModalContentProps) => {
   const [activityName, setActivityName] = useState("");
   const [activityType, setActivityType] = useState<ActivityType>("UNDEFINED");
   const dispatch = useAppDispatch();


   const handleCreation = useCallback(() => {
      if (activityType !== "UNDEFINED" && activityType) {
         onCreation();
         dispatch(addActivity({name: activityName, type: activityType}))
      }
   }, [activityType]);

   return <div className={cssClasses.modalWrapper}><h3>Add an activity</h3>
      <Input id={"activity_name"} placeholder={"Choose activity name"} onChange={value => setActivityName(value)}
             value={activityName}/>
      <Dropdown options={enumToObjectMapper(ACTIVITY_TYPE.Enum)} label={"Activity Type"}
                setValue={(value) => setActivityType(ACTIVITY_TYPE.parse(value))}/>
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