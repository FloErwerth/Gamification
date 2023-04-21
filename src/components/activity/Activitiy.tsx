import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {ActivityProps} from "../../store/activities/types";

const cssClasses = getClasses(styles)

type TActivityProps = Pick<ActivityProps, "stats">

export const Activity = ({
                            stats
                         }: TActivityProps) => {

   return (
      <div className={cssClasses.activityWrapper}>
         {stats.map((stat) => <div key={stat}>{stat}</div>)}
      </div>
   );
};
