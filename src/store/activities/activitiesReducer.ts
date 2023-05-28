import {InitialGamificiationState} from "../store";
import {ActivitiesActions, ActivitiesActionType} from "./activitiesActions";
import produce from "immer";

const increaseLevels = (currentValue: number, level: number, maxValue: number): { level: number, maxValue: number } => {
   let currentLevel = level + 1;
   let currentMaxValue = maxValue;
   currentMaxValue = currentMaxValue === 0 ? 2 : currentMaxValue * 2;
   if (currentValue >= currentMaxValue) {
      return increaseLevels(currentValue, currentLevel, currentMaxValue);
   }
   return {level: currentLevel, maxValue: currentMaxValue};
}
const decreaseLevels = (currentValue: number, level: number, maxValue: number): { level: number, maxValue: number } => {
   let currentLevel = level;
   let currentMaxValue = maxValue;
   if (currentMaxValue > 1 && currentMaxValue / 2 > currentValue) {
      currentMaxValue /= 2;
      currentLevel--;
      return decreaseLevels(currentValue, currentLevel, currentMaxValue);
   }
   return {level: currentLevel, maxValue: currentMaxValue}
}

export const activitiesReducer = (oldActivities = InitialGamificiationState.activities, action: ActivitiesActions) => {
   if (action.type === ActivitiesActionType.ADD_ACTIVITY) {
      return [...oldActivities, action.payload]
   }
   if (action.type === ActivitiesActionType.SET_ACTIVITIES) {
      return Object.values(action.payload)
   }
   if (action.type === ActivitiesActionType.DELETE_ACTIVITY) {
      return produce(oldActivities, activities => {
         activities.splice(action.payload.activityIndex, 1);
      })
   }
   if (action.type === ActivitiesActionType.UPDATE_ACTIVITY) {
      return produce(oldActivities, newActivities => {
         newActivities[action.payload.index] = action.payload.activity;
      })
   }
   if (action.type === ActivitiesActionType.DELETE_CELL) {
      return produce(oldActivities, newActivities => {
         delete newActivities[action.payload.activityIndex].calendarEntries[action.payload.date];
      })
   }
   if (action.type === ActivitiesActionType.UPDATE_CELL) {
      return produce(oldActivities, newActivities => {
         const cell = newActivities[action.payload.activityIndex].calendarEntries[action.payload.date];
         newActivities[action.payload.activityIndex].calendarEntries[action.payload.date] = {...cell, ...action.payload.content};
      })
   }
   return oldActivities;
}