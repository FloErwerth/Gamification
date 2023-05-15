import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {StatInfoMap, StatWithValue} from "../../activitiesAssembly/stats";
import {useMemo} from "react";
import {isTimeType, toTimeFormat} from "../../utils/getStringifiedTime";

interface IDisplayedStat {
   stat: StatWithValue
}

const cssClasses = getClasses(styles);
export const DisplayedStat = ({stat}: IDisplayedStat) => {
   const mappedStat = StatInfoMap(stat.name);

   const getValue = useMemo(() => {
      if (isTimeType(mappedStat.type)) {
         return toTimeFormat(stat.value, mappedStat.type === "hours");
      }
      return stat.value;
   }, [mappedStat, stat])

   return <div className={cssClasses.statWrapper}>
      <div className={cssClasses.name}>{mappedStat.name}:</div>
      <div
         className={cssClasses.value}>{getValue}</div>
      <div className={cssClasses.unit}>{mappedStat.preferedUnit}</div>
   </div>
}