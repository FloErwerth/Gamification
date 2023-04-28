import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {StatMap, StatWithValue} from "../../activitiesAssembly/stats";

interface IDisplayedStat {
   stat: StatWithValue
}

const cssClasses = getClasses(styles);
export const DisplayedStat = ({stat}: IDisplayedStat) => {
   const mappedStat = StatMap(stat.name);
   return <div className={cssClasses.statWrapper}>
      <div className={cssClasses.name}>{mappedStat.name}:</div>
      <div
         className={cssClasses.value}>{stat.value}</div>
      <div className={cssClasses.unit}>{mappedStat.preferedUnit}</div>
   </div>
}