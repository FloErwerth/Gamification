import {getClasses} from "../../utils/styleUtils";
import {overStyles} from "./overStyles";
import {ActivityWrapper} from "../../components/activity/ActivityWrapper";
import {useFilter} from "../../utils/useFilter";
import {InputWithDelete} from "../../components/basicComponents/Input/InputWithDelete";
import {useAppSelector} from "../../store/store";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {ActivityAdder} from "../../components/ActivityAdder/ActivityAdder";
import {StatsProps} from "../../store/activities/types";

const cssClasses = getClasses(overStyles);

export const Overview = () => {
   const stats = useAppSelector(getActivities).map((stats, index) => (
      <ActivityWrapper {...stats} index={index}/>
   ));
   const {filteredArray, setFilter, filter} = useFilter<StatsProps>(stats);

   return (
      <div>
         <div className={cssClasses.headerWrapper}><h3>Activity overview</h3>
            {stats.length > 0 && <InputWithDelete
                placeholder={"Filter activities"}
                type="text"
                value={filter}
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
