import {useMemo} from "react";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {Star} from "../../media/icons";
import {ActivityProps} from "../../store/activities/types";

type TActivityProps = Omit<ActivityProps, "name" | "width" | "calendarEntries" | "stats">
export const Activity = ({
                            currentValue,
                            maxValue,
                            level,
                         }: TActivityProps) => {
   const cssClasses = useMemo(
      () =>
         getClasses(
            styles(((currentValue * 100) / maxValue).toString().concat("%"))
         ),
      [currentValue, maxValue]
   );
   return (
      <div className={cssClasses.barWrapper}>
         <div className={cssClasses.bar}>
            <div className={cssClasses.xp}>
               {currentValue}/{maxValue}
            </div>
         </div>
         <div className={cssClasses.levelWrapper}>
            <Star className={cssClasses.star}/>
            <div className={cssClasses.level}>{level}</div>
         </div>
      </div>
   );
};
