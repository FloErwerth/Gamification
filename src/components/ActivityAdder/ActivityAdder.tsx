import {useCallback, useState} from "react";
import {Button} from "../basicComponents/Button/Button";
import {Modal} from "../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {Input} from "../basicComponents/Input/Input";
import {Dropdown} from "../basicComponents/Dropdown/Dropdown";
import {addActivity} from "../../store/activities/activitiesActions";
import {ACTIVITY_INCREASE_TYPES, ACTIVITY_TYPE, ActivityIncrease, ActivityType,} from "../../store/activities/types";
import {getInitialMaxValue} from "../../store/activities/util";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addActivityInDatabase} from "../../../firebase";
import {getIsLoggedIn, getUserId,} from "../../store/authentication/authSelectors";

const cssClasses = getClasses(activityAdderClasses);

interface ActivityAdderModalContentProps {
   onCreation: () => void;
}

const AddActivityModalContent = ({
                                    onCreation,
                                 }: ActivityAdderModalContentProps) => {
   const [activityName, setActivityName] = useState("");
   const [activityType, setActivityType] = useState<ActivityType>("UNDEFINED");
   const [increasement, setIncreasement] =
      useState<ActivityIncrease>("UNDEFINED");
   const userId = useAppSelector(getUserId);
   const [increasementFactor, setIncreasementFactor] = useState(2);

   const dispatch = useAppDispatch();
   const handleCreation = useCallback(() => {
      if (
         activityType !== "UNDEFINED" &&
         increasement !== "UNDEFINED" &&
         activityName &&
         userId
      ) {
         onCreation();
         const generatedActivity = {
            name: activityName,
            type: activityType,
            calendarEntries: {},
            increasement,
            increasementFactor,
            maxValue: getInitialMaxValue(increasement),
            currentValue: 0,
            level: 0,
         };
         addActivityInDatabase(userId, generatedActivity).then(() => {
            dispatch(addActivity(generatedActivity));
         });
      }
   }, [getInitialMaxValue, increasementFactor, increasement, activityType, activityName]);

   const handleSetIncreasementFactor = useCallback((value: string) => {
      try {
         const number = parseInt(value);
         if (number < 2) {
            setIncreasementFactor(2);
            return;
         }
         setIncreasementFactor(number);
      } catch {
         setIncreasementFactor(2);
      }

   }, []);

   return (
      <div className={cssClasses.modalWrapper}>
         <div>Add an activity</div>
         <Input
            customWrapperClasses={cssClasses.input}
            label={"Activity Name"}
            onChange={(value) => setActivityName(value)}
            value={activityName}
         />
         <Dropdown
            options={ACTIVITY_TYPE.options.filter(
               (option) => option !== "UNDEFINED"
            )}
            label={"Activity Type"}
            setValue={(value) => setActivityType(ACTIVITY_TYPE.parse(value))}
         />
         <Dropdown
            options={ACTIVITY_INCREASE_TYPES.options.filter(
               (option) => option !== "UNDEFINED"
            )}
            label={"Activity Increase"}
            setValue={(value) =>
               setIncreasement(ACTIVITY_INCREASE_TYPES.parse(value))
            }
         />
         {increasement === "Factor" &&
             <Input customWrapperClasses={cssClasses.input}
                    onChange={handleSetIncreasementFactor}
                    value={increasementFactor} type={"number"} placeholder={"Factor bigger or equal 2"}/>}
         <Button onClick={handleCreation}>Create Activity</Button>
      </div>
   );
};

export const ActivityAdder = () => {
   const [showAdderModal, setShowAdderModal] = useState(false);
   const loggedIn = useAppSelector(getIsLoggedIn);

   if (!loggedIn) {
      return null;
   }

   return (
      <>
         <Button
            className={cssClasses.adder}
            onClick={() => setShowAdderModal(true)}
         >
            Add Activity
         </Button>
         {showAdderModal && (
            <Modal open={showAdderModal} onClose={() => setShowAdderModal(false)}>
               <AddActivityModalContent
                  onCreation={() => setShowAdderModal(false)}
               />
            </Modal>
         )}
      </>
   );
};
