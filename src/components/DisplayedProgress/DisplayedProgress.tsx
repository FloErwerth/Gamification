import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useMemo} from "react";
import {isTimeType, toTimeFormat} from "../../utils/getStringifiedTime";
import {Stat} from "../../activitiesAssembly/stats";

interface IDisplayedStat {
   stat: Stat
}

const cssClasses = getClasses(styles);
export const DisplayedProgress = ({stat}: IDisplayedStat) => {
   const getValue = useMemo(() => {
      if (isTimeType(stat?.type.input)) {
         if (typeof stat.value === "number") {
            return toTimeFormat(stat.value, stat?.type.input);
         }
      }
      return stat.value;
   }, [stat])

   return <div className={cssClasses.statWrapper}>
      <div className={cssClasses.name}>{stat?.name}:</div>
      <div
         className={cssClasses.value}>{getValue}</div>
      <div className={cssClasses.unit}>{stat?.preferedUnit}</div>
   </div>
}