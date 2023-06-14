import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useMemo} from "react";
import {isTimeType, toTimeFormat} from "../../utils/getStringifiedTime";
import {Unit} from "../../activitiesAssembly/units";
import {ActivityInputTypes} from "../ActivityInput/ActivityInput";

interface IDisplayedStat {
   value: number;
   unit: Unit;
   name: string;
   inputType: ActivityInputTypes
}

const cssClasses = getClasses(styles);
export const DisplayedProgress = ({value, inputType, name, unit}: IDisplayedStat) => {
   const getValue = useMemo(() => {
      if (isTimeType(inputType)) {
         return toTimeFormat(value, inputType);
      }
      return value;
   }, [inputType, value])

   return <div className={cssClasses.statWrapper}>
      <div className={cssClasses.name}>{name}:</div>
      <div
         className={cssClasses.value}>{getValue}</div>
      <div className={cssClasses.unit}>{unit}</div>
   </div>
}