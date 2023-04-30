import {Box, Paper} from "@mui/material";
import {PropsWithChildren} from "react";
import {useAppSelector} from "../../store/store";
import {
   getActivitiesCreated,
   getActivitiesDone,
   getAverageActivitiesDoneDaily,
   getMaxActivitiesDoneADay
} from "../../store/activities/activitiesSelectors";
import {getFormatedTimeSinceCreation} from "../../store/authentication/authSelectors";
import {getBadges} from "../../store/badges/badgesSelector";

const Item = ({children}: PropsWithChildren) => {
   return <Paper sx={{padding: 2}} elevation={3}>{children}</Paper>
};

export const OverallStatistics = () => {
   const activitiesCreated = useAppSelector(getActivitiesCreated);
   const activitiesDone = useAppSelector(getActivitiesDone);
   const averageActivitiesDoneDaily = useAppSelector(getAverageActivitiesDoneDaily);
   const maxActivitiesDoneDaily = useAppSelector(getMaxActivitiesDoneADay);
   const timeSinceCreationOfAccount = useAppSelector(getFormatedTimeSinceCreation);
   const badgesEarned = useAppSelector(getBadges)

   return <Box marginTop={5}><p>General Statistics</p>
      <div style={{padding: 5}}>
         <h5>Activities</h5>
         <p>Activities created: {activitiesCreated}</p>
         <p>Total activities done: {activitiesDone}</p>
         <p>Average activities done since creation of account: {averageActivitiesDoneDaily}</p>
         <p>Maximum activities done in one
            day: {<br/>}
            <div
               style={{marginLeft: 20}}>date: {maxActivitiesDoneDaily.date} number:{maxActivitiesDoneDaily.numberOfActivities}</div>
         </p>
         <h5>Personal statistics</h5>
         <p>Time since creation of account: {timeSinceCreationOfAccount}</p>
      </div>

      <div style={{padding: 5}}></div>
      <h5>Badges</h5>
      <>{badgesEarned.map((badge) => <div>{badge.title}</div>)}</>

   </Box>
}