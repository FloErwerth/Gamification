import {useCallback, useEffect, useState} from "react";
import {Activity} from "../../components/activity/Activitiy";
import {Button} from "../../components/basicComponents/Button/Button";
import {useNumberIncreaser} from "../../hooks/useNumberIncreaser";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {useAppSelector} from "../../store/store";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";

const cssClasses = getClasses(styles);

export const ActivityPage = () => {
   const [progress, setProgress] = useState<number>(0);
   const [confirmed, setConfirmed] = useState(false);
   const [activeActivity, setActiveActivity] = useState(
      useAppSelector(getActiveActivity)
   );

   useEffect(() => {
      if (confirmed) {
      }
   }, [confirmed]);

   const currentValue = useNumberIncreaser(
      activeActivity.currentValue + progress
   );
   const [editProgress, setEditProgress] = useState(false);

   const handleProgress = useCallback(() => {
      const newCurrentValue = activeActivity.currentValue + progress;
      setActiveActivity((currentActivity) => {
         return {...currentActivity, currentValue: newCurrentValue};
      });
      setEditProgress(false);
   }, [progress, editProgress, activeActivity]);

   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedNum = parseInt(e.target.value);
      if (isNaN(parsedNum)) {
         setProgress(0);
      } else {
         setProgress(parsedNum);
      }
   }, []);

   return (
      <div className={cssClasses.wrapper}>
         <div className={cssClasses.title}>{activeActivity.name}</div>
         <Activity {...activeActivity} />
         {editProgress ? (
            <div className={cssClasses.progressWrapper}>
               Cool, that you have made progress!{" "}
               <div>Tell us how many {activeActivity.type} you got:</div>
               <input type={"text"} value={progress} onChange={handleChange}></input>
               <Button onClick={handleProgress}>Confirm progress</Button>
            </div>
         ) : (
            <Button onClick={() => setEditProgress(true)}>Make progess</Button>
         )}
      </div>
   );
};
