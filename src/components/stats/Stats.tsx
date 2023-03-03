import {getClasses} from "../../utils/styleUtils";
import {useCallback, useEffect, useMemo, useState} from "react";
import {statStyles} from "./statStyles";
import {Star} from "../../media/icons";
import {ActivityIncrease, ActivityType} from "../../store/activities/types";

//TODO: implement type
export type StatsProps = {
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   type: ActivityType
   increasement: ActivityIncrease
}

const useNumberIncreaser = (currentXP: number) => {

   const [localXP, setLocalXP] = useState(currentXP);
   const [animationTriggered, setAnimationTriggered] = useState(false);
   const [speed, setSpeed] = useState(0);

   const animateNumber = useCallback((currentNumber: number) => {
      if (currentNumber === currentXP) {
         setAnimationTriggered(false);
         return;
      }
      setLocalXP(currentNumber + 1);
      setTimeout(() => animateNumber(currentNumber + 1), speed);
   }, [localXP, currentXP, speed])

   useEffect(() => {
      if (localXP === currentXP) {
         setSpeed(0);
         return;
      }
      if (localXP !== currentXP && !animationTriggered) {
         setAnimationTriggered(true);
         setSpeed(300 / (currentXP - localXP));
         animateNumber(localXP);
      }

   }, [localXP, currentXP, animationTriggered]);
   return [localXP];
}

export const Stats = ({currentValue, maxValue, level, name, type}: StatsProps) => {
   const cssClasses = useMemo(() => getClasses(statStyles((currentValue * 100 / maxValue).toString().concat("%"))), [currentValue, maxValue]);
   return <div>
      {name}
      <div className={cssClasses.barWrapper}>

         <div className={cssClasses.bar}>
            <div className={cssClasses.xp}>{currentValue}/{maxValue} {type}</div>
         </div>
         <div className={cssClasses.levelWrapper}><Star className={cssClasses.star}/>
            <div className={cssClasses.level}>{level}</div>
         </div>
      </div>
   </div>
}