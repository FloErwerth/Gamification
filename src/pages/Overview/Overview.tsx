import {getClasses} from "../../utils/styleUtils";
import {overStyles} from "./overStyles";
import {ActivityWrapper} from "../../components/activity/ActivityWrapper";
import {useFilter} from "../../utils/useFilter";
import {InputWithDelete} from "../../components/Input/InputWithDelete";
import {useAppSelector} from "../../store/store";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {ActivityAdder} from "../../components/ActivityAdder/ActivityAdder";
import {ActivityProps} from "../../store/activities/types";

const cssClasses = getClasses(overStyles);

export const Overview = () => {
   const stats = useAppSelector(getActivities).map((stats, index) => (
      <ActivityWrapper key={index} {...stats} index={index}/>
   ));
   const {filteredArray, setFilter} = useFilter<ActivityProps>(stats);

   return (
      <div>
         <div className={cssClasses.headerWrapper}><h3>Activity overview</h3>
            {stats.length > 0 && <InputWithDelete
                placeholder={"Filter activities"}
                type="text"
                onChange={(value) => setFilter(value)}
            />}
         </div>

         <div className={cssClasses.statsWrapper}>{filteredArray}</div>

         <div className={cssClasses.activityAdderWrapper}>
            <ActivityAdder/>
         </div>
      </div>
   );
};
