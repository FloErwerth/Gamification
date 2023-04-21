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
   const activities = useAppSelector(getActivities).map((activities, index) => (
      <ActivityWrapper key={index} {...activities} index={index}/>
   ));

   const {filteredArray, setFilter} = useFilter<ActivityProps>(activities);

   return (
      <>
         <div className={cssClasses.headerWrapper}><h3>Activity overview</h3>
            {activities.length > 0 && <InputWithDelete
                placeholder={"Filter activities"}
                type="text"
                onChange={(value) => setFilter(value)}
            />}
         </div>

         <div className={cssClasses.statsWrapper}>{filteredArray}</div>
         <div className={cssClasses.activityAdderWrapper}>
            <ActivityAdder/>
         </div>
      </>
   );
};
