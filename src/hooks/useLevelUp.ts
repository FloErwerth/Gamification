import {useCallback, useState} from "react";
import {getActiveActivity} from "../store/activity/activitySelector"
import {useAppSelector} from "../store/store"

export const useLevelUp = () => {
   const [activeActivity, setActiveActivity] = useState(useAppSelector(getActiveActivity));
   const [progress, setProgress] = useState<number>(0);

   const onConfirmProgress = useCallback(() => {
      setActiveActivity((current) => {
         const newActivity = current;
         newActivity.currentValue += progress;
         return {...newActivity}
      })
   }, [progress, activeActivity])


}