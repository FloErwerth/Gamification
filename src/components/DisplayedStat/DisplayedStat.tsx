import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {StatWithValue} from "../../activitiesAssembly/stats";
import {useMemo} from "react";
import {isTimeType, toTimeFormat} from "../../utils/getStringifiedTime";
import {useAppSelector} from "../../store/store";
import {getActiveActivityInfo} from "../../store/activeActivity/activitySelector";

interface IDisplayedStat {
   stat: StatWithValue
}

const cssClasses = getClasses(styles);
export const DisplayedStat = ({stat}: IDisplayedStat) => {
   const activeActivityInfo = useAppSelector(getActiveActivityInfo(stat.name));
   const getValue = useMemo(() => {
      if (isTimeType(activeActivityInfo?.type.input)) {
         return toTimeFormat(stat.value, activeActivityInfo?.type.format ?? "mm:ss");
      }
      return stat.value;
   }, [stat])

   return <div className={cssClasses.statWrapper}>
      <div className={cssClasses.name}>{activeActivityInfo?.name}:</div>
      <div
         className={cssClasses.value}>{getValue}</div>
      <div className={cssClasses.unit}>{activeActivityInfo?.preferedUnit}</div>
   </div>
}