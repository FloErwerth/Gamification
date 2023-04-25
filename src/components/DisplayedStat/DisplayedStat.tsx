import {StatMap, StatWithValue} from "../../types/predefinedActivities";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";

interface IDisplayedStat {
   stat: StatWithValue
}

const cssClasses = getClasses(styles);
export const DisplayedStat = ({stat}: IDisplayedStat) => {
   const mappedStat = StatMap(stat.name);
   return <div className={cssClasses.statWrapper}>{mappedStat.text}
      <div
         className={cssClasses.value}>{stat.value}</div>
      {mappedStat.preferedUnit}</div>
}