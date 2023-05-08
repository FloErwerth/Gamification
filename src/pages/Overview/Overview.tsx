import {getClasses} from "../../utils/styleUtils";
import {overStyles} from "./overStyles";
import {usePropsFilter} from "../../utils/usePropsFilter";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {ActivityAdder} from "../../components/ActivityAdder/ActivityAdder";
import {ActivityWrapper} from "../../components/activity/ActivityWrapper";
import {Input} from "../../components/Input/Input";
import {useEffect} from "react";
import {setLastPage} from "../../store/router/routerActions";
import {Pages} from "../../types/pages";

const cssClasses = getClasses(overStyles);

export const Overview = () => {
   const activities = useAppSelector(getActivities);
   const {filteredArray, setFilter, filter} = usePropsFilter(activities, "name");
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setLastPage(Pages.OVERVIEW));
   }, [])

   return (
      <>
         <div className={cssClasses.headerWrapper}><h3>Activity overview</h3>
            {activities.length > 0 && <Input
                type="text"
                label="Filter activities"
                value={filter}
                onChange={(value) => setFilter(value)}
            />}
         </div>

         <div className={cssClasses.statsWrapper}>{filteredArray.map((activityProps, index) =>
            <ActivityWrapper index={index} {...activityProps} />)}</div>
         <div className={cssClasses.activityAdderWrapper}>
            <ActivityAdder/>
         </div>
      </>
   );
};
