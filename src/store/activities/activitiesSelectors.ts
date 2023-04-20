import {GamificationModel} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {ActivityProps, DateType} from "./types";

export const getActivities = ({activities}: GamificationModel) => Object.values<ActivityProps>(activities);
export const getCalendarEntries = (index: number) => createSelector([getActivities], (activities) => {
   if (activities.length > 0) {
      return activities[index]?.calendarEntries
   } else return {}
})
export const getCell = (index: number, date: DateType) => createSelector([getCalendarEntries(index)], (calendarEntries) => {
   return calendarEntries[date];
})
