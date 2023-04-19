import {Stat} from "../../store/activities/predefinedActivities";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";

interface IDisplayedStat {
   stat: Stat
}

const cssClasses = getClasses(styles);
export const DisplayedStat = ({stat}: IDisplayedStat) => {
   return <div className={cssClasses.statWrapper}>{stat.text}
      <div
         className={cssClasses.value}>{stat.value}</div>
      {stat.preferedUnit}</div>
}