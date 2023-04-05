import {GamificationActionTypes} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivitiesActions} from "./activitiesActions";
import produce from "immer";

export const activitiesReducer = (oldActivities = InitialGamificiationState.activities, action: ActivitiesActions) => {
   if (action.type === GamificationActionTypes.ADD_ACTIVITY) {
      return [...oldActivities, action.payload]
   }
   if (action.type === GamificationActionTypes.SET_ACTIVITIES) {
      return action.payload
   }
   if (action.type === GamificationActionTypes.CHANGE_ACTIVITY) {
      return produce(oldActivities, newActivities => {
         newActivities[action.payload.index] = action.payload.activity;
      })
   }
   if (action.type === GamificationActionTypes.UPDATE_ACTIVITY_CALENDAR_CELL) {
      return produce(oldActivities, newActivities => {
         const map = newActivities[action.payload.activityIndex];
         if (!map) {
            newActivities[action.payload.activityIndex].calendarEntries = new Map();
         }
         newActivities[action.payload.activityIndex].calendarEntries.set(action.payload.date, action.payload.marked);
      })
   }
   return oldActivities;
}