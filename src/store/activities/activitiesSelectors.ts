import {GamificationModel} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {ActivityProps, DateType} from "./types";
import {getDaysSinceCreation} from "../authentication/authSelectors";
import {getWholeDisplayDate} from "../../components/calendar/utils";

export const getActivities = ({activities}: GamificationModel) => Object.values<ActivityProps>(activities);
export const getCalendarEntries = (index: number) => createSelector([getActivities], (activities) => {
   if (activities.length > 0) {
      return activities[index]?.calendarEntries
   } else return {}
})
export const getCell = (index: number, date: DateType) => createSelector([getCalendarEntries(index)], (calendarEntries) => {
   return calendarEntries[date];
})

export const getActivitiesCreated = createSelector([getActivities], (actvities) => actvities.length);

export const getActivitiesDone = createSelector([getActivities], (actvities) => actvities.reduce((activitiesDone: number, currentActivity) => {
   return activitiesDone + Object.values(currentActivity.calendarEntries).length;
}, 0));

export const getAverageActivitiesDoneDaily = createSelector([getDaysSinceCreation, getActivitiesDone], (daysSinceCreation, getActivitiesDone) => {
   return getActivitiesDone / daysSinceCreation;
})

export const getMaxActivitiesDoneADay = createSelector([getActivities], activities => {
   const dates: { date: DateType, numberOfActivities: number }[] = []

   activities.forEach((activity) => {
      Object.entries(activity.calendarEntries).forEach(([date, calendarEntries], index) => {
         const foundEntry = Object.values(dates).find((entry) => entry.date === date);
         if (!foundEntry) {
            dates.push({date: date as DateType, numberOfActivities: 1});
         } else {
            foundEntry.numberOfActivities++;
         }
      });
   })
   const {date, numberOfActivities} = dates.sort((a, b) => b.numberOfActivities - a.numberOfActivities)[0];
   return {
      date: getWholeDisplayDate(date),
      numberOfActivities
   };
});
