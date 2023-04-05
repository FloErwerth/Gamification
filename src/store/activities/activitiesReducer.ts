import {GamificationActionTypes} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivitiesActions} from "./activitiesActions";
import produce from "immer";
import {StatsProps} from "./types";

export const activitiesReducer = (oldActivities = InitialGamificiationState.activities, action: ActivitiesActions) => {
   if (action.type === GamificationActionTypes.ADD_ACTIVITY) {
      return [...oldActivities, action.payload]
   }
   if (action.type === GamificationActionTypes.SET_ACTIVITIES) {
      return action.payload
   }
   if (action.type === GamificationActionTypes.CHANGE_ACTIVITY) {
      return produce<StatsProps[]>(oldActivities, newActivities => {
         newActivities[action.payload.index] = action.payload.activity;
      })
   }
   if (action.type === GamificationActionTypes.UPDATE_ACTIVITY_CALENDAR_CELL) {
      return produce<StatsProps[]>(oldActivities, newActivities => {
         if (!newActivities[action.payload.activityIndex].calendarEntries || Object.keys(newActivities[action.payload.activityIndex].calendarEntries).length === 0) {
            newActivities[action.payload.activityIndex].calendarEntries = {[action.payload.date]: {marked: action.payload.marked}};
         } else {
            newActivities[action.payload.activityIndex].calendarEntries[action.payload.date] = {marked: action.payload.marked};
         }
      })
   }
   return oldActivities;
}