import {getClasses} from "../../utils/styleUtils";
import {overStyles} from "./overStyles";
import {usePropsFilter} from "../../utils/usePropsFilter";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getActivities} from "../../store/activities/activitiesSelectors";
import {ActivityWrapper} from "../../components/activity/ActivityWrapper";
import {Input} from "../../components/Input/Input";
import {useContext, useEffect} from "react";
import {setLastPage} from "../../store/router/routerActions";
import {Pages} from "../../types/pages";
import Button from "@mui/material/Button";
import {
   ActivityManipulatorContext
} from "../../components/ActivityManipulator/ActivityManipulatorContext/ActivityManipulatorContext";

const cssClasses = getClasses(overStyles);

export const Overview = () => {
   const activities = useAppSelector(getActivities);
   const {filteredArray, setFilter, filter} = usePropsFilter(activities, "name");
   const dispatch = useAppDispatch();
   const {openActivityManipulator} = useContext(ActivityManipulatorContext);

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
            <Button onClick={() => openActivityManipulator?.(false)}>Add activity</Button>
         </div>
      </>
   );
};
