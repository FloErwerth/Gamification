import {GamificationModel} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {DateType} from "./types";

export const getActivities = ({activities}: GamificationModel) => activities;
export const getCalendarEntries = (index: number) => createSelector([getActivities], (activities) => {
   return activities[index].calendarEntries
})
export const getCell = (index: number, date: DateType) => createSelector([getCalendarEntries(index)], (calendarEntries) => {
   return calendarEntries[date];
})
