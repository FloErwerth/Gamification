import {getClasses} from "../../utils/styleUtils";
import {overStyles} from "./overStyles";
import {ActivityWrapper, StatsProps,} from "../../components/activity/ActivityWrapper";
import {useFilter} from "../../utils/useFilter";
import {css} from "@emotion/css";
import {InputWithDelete} from "../../components/basicComponents/Input/InputWithDelete";
import {useAppSelector} from "../../store/store";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {ActivityAdder} from "../../components/ActivityAdder/ActivityAdder";

const cssClasses = getClasses(overStyles);

export const Overview = () => {
   const stats = useAppSelector(getActivities).map((stats, index) => (
      <ActivityWrapper {...stats} index={index}/>
   ));
   const {filteredArray, setFilter, filter} = useFilter<StatsProps>(stats);

   return (
      <div>
         <h3>Hello Florian, good to see you back.</h3>
         <p>Your current stats are the following:</p>
         <div className={cssClasses.filterWrapper}>
            <InputWithDelete
               placeholder={"Filter activities"}
               type="text"
               id="Search"
               customWrapperClasses={css({outlineColor: "rgb(100,200,200)"})}
               value={filter}
               onChange={(value) => setFilter(value)}
            />
         </div>
         <div className={cssClasses.statsWrapper}>{filteredArray}</div>
         <div className={cssClasses.activityAdderWrapper}>
            <ActivityAdder/>
         </div>
      </div>
   );
};
