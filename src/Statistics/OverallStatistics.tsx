import {Box} from "@mui/material";
import {useAppSelector} from "../store/store";
import {
   getActivitiesCreated,
   getActivitiesDone,
   getAverageActivitiesDoneDaily,
   getMaxActivitiesDoneADay
} from "../store/activities/activitiesSelectors";
import {getFormatedTimeSinceCreation} from "../store/authentication/authSelectors";
import {BadgesSheet} from "../components/BadgesSheet/BadgesSheet";

export const OverallStatistics = () => {
   const activitiesCreated = useAppSelector(getActivitiesCreated);
   const activitiesDone = useAppSelector(getActivitiesDone);
   const averageActivitiesDoneDaily = useAppSelector(getAverageActivitiesDoneDaily);
   const maxActivitiesDoneDaily = useAppSelector(getMaxActivitiesDoneADay);
   const timeSinceCreationOfAccount = useAppSelector(getFormatedTimeSinceCreation);

   return <Box marginTop={5} marginBottom={10}><p>General Statistics</p>
      <div style={{padding: 5}}>
         <h5>Activities</h5>
         <p>Activities created: {activitiesCreated}</p>
         <p>Total activities done: {activitiesDone}</p>
         <p>Average activities done since creation of account: {averageActivitiesDoneDaily}</p>
         {maxActivitiesDoneDaily && <p>Maximum activities done in one
             day: {<br/>}
             <div
                 style={{marginLeft: 20}}>date: {maxActivitiesDoneDaily.date} number:{maxActivitiesDoneDaily.numberOfActivities}</div>
         </p>}
         <h5>Personal statistics</h5>
         <p>Time since creation of account: {timeSinceCreationOfAccount}</p>
      </div>

      <div style={{padding: 5}}></div>
      <BadgesSheet/>
   </Box>
}