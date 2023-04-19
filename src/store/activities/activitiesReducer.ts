import {InitialGamificiationState} from "../store";
import {ActivitiesActions} from "./activitiesActions";
import produce from "immer";
import {ActivityProps, DateType} from "./types";
import {GamificationActionTypes} from "../actions";

const getCleanedCalendar = (calendar: ActivityProps["calendarEntries"]): ActivityProps["calendarEntries"] => {
   const filteredValues = Object.keys(calendar).filter((entry) => {
      return calendar[entry as DateType].marked;
   })
   return filteredValues.reduce((previousValue, currentValue) => {
      return {...previousValue, [currentValue]: {...calendar[currentValue as DateType]}}
   }, {});
}

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
   if (action.type === GamificationActionTypes.ADD_ACTIVITY) {
      return [...oldActivities, action.payload]
   }
   if (action.type === GamificationActionTypes.SET_ACTIVITIES) {
      return action.payload
   }
   if (action.type === GamificationActionTypes.UPDATE_STATS) {
      return produce(oldActivities, newActivities => {
         const calendarCell = newActivities[action.payload.activityIndex].calendarEntries[action.payload.date];
         if (!calendarCell) {

         }
      })
   }
   if (action.type === GamificationActionTypes.CHANGE_ACTIVITY) {
      return produce<ActivityProps[]>(oldActivities, newActivities => {
         const calendarEntries = getCleanedCalendar(action.payload.activity.calendarEntries);
         newActivities[action.payload.activityIndex] = {
            ...action.payload.activity, calendarEntries
         }
      })
   }
   if (action.type === GamificationActionTypes.UPDATE_ADDITIONAL_CELL_INFO) {
      return produce<ActivityProps[]>(oldActivities, newActivities => {
         const cell = newActivities[action.payload.activityIndex].calendarEntries[action.payload.date];
         if (cell) {
            cell.info = action.payload.info;
            newActivities[action.payload.activityIndex].calendarEntries[action.payload.date] = cell;
         }
      })
   }
   return oldActivities;
}