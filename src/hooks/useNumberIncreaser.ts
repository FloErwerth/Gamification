import {useCallback, useEffect, useState} from "react";

export const useNumberIncreaser = (currentXP: number) => {
   const [localXP, setLocalXP] = useState(currentXP);
   const [animationTriggered, setAnimationTriggered] = useState(false);
   const [speed, setSpeed] = useState(0);

   const animateNumber = useCallback(
      (currentNumber: number) => {
         if (currentNumber === currentXP) {
            setAnimationTriggered(false);
            return;
         }
         setLocalXP(currentNumber + 1);
         setTimeout(() => animateNumber(currentNumber + 1), speed);
      },
      [localXP, currentXP, speed]
   );

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
};