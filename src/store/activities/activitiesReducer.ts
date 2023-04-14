import {InitialGamificiationState} from "../store";
import {ActivitiesActions} from "./activitiesActions";
import produce from "immer";
import {DateType, StatsProps} from "./types";
import {GamificationActionTypes} from "../actions";

const getCleanedCalendar = (calendar: StatsProps["calendarEntries"]): StatsProps["calendarEntries"] => {
   const filteredValues = Object.keys(calendar).filter((entry) => {
      return calendar[entry as DateType].marked;
   })
   return filteredValues.reduce((previousValue, currentValue) => {
      return {...previousValue, [currentValue]: {...calendar[currentValue as DateType]}}
   }, {});
}

const increaseLevels = (currentValue: number, level: number, maxValue: number, increasement: StatsProps["increasement"], increasementFactor: StatsProps["increasementFactor"]): { level: number, maxValue: number } => {
   let currentLevel = level + 1;
   let currentMaxValue = maxValue;
   switch (increasement) {
      case "Linear": {
         currentMaxValue++;
      }
         break;
      case "Quadratic": {
         currentMaxValue = Math.pow(currentMaxValue, 2);
      }
         break;
      case "Factor": {
         currentMaxValue = currentMaxValue === 0 ? increasementFactor : currentMaxValue * increasementFactor;
      }
         break;
      default:
         currentMaxValue++;
         break;
   }
   if (currentValue >= currentMaxValue) {
      return increaseLevels(currentValue, currentLevel, currentMaxValue, increasement, increasementFactor);
   }
   return {level: currentLevel, maxValue: currentMaxValue};
}
const decreaseLevels = (currentValue: number, level: number, maxValue: number, increasement: StatsProps["increasement"], increasementFactor: StatsProps["increasementFactor"]): { level: number, maxValue: number } => {
   let currentLevel = level;
   let currentMaxValue = maxValue;
   switch (increasement) {
      case "Linear": {
         if (currentMaxValue - 1 > currentValue) {
            currentMaxValue--;
            currentLevel--;
            return decreaseLevels(currentValue, currentLevel, currentMaxValue, increasement, increasementFactor);
         } else break;
      }
      case "Quadratic": {
         if (Math.sqrt(currentMaxValue) > currentValue) {
            if (currentValue === 1) {
               currentMaxValue = 2;
               break;
            }
            if (currentValue === 0) {
               currentMaxValue = 2;
               currentLevel--;
               break;
            }
            currentMaxValue = Math.sqrt(currentMaxValue);
            currentLevel--;
            return decreaseLevels(currentValue, currentLevel, currentMaxValue, increasement, increasementFactor);
         }
      }
         break;
      case "Factor": {
         if (currentMaxValue > 1 && currentMaxValue / increasementFactor > currentValue) {
            currentMaxValue /= increasementFactor;
            currentLevel--;
            return decreaseLevels(currentValue, currentLevel, currentMaxValue, increasement, increasementFactor);
         } else break;
      }
      default:
         if (currentMaxValue - 1 > currentValue) {
            currentMaxValue--;
            currentLevel--;
            return decreaseLevels(currentValue, currentLevel, currentMaxValue, increasement, increasementFactor);
         } else break;
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
   if (action.type === GamificationActionTypes.CHANGE_ACTIVITY) {
      return produce<StatsProps[]>(oldActivities, newActivities => {
         const calendarEntries = getCleanedCalendar(action.payload.activity.calendarEntries);
         newActivities[action.payload.activityIndex] = {
            ...action.payload.activity, calendarEntries
         }
      })
   }
   if (action.type === GamificationActionTypes.INCREASE_PROGRESS) {
      return produce<StatsProps[]>(oldActivities, newActivities => {
         const activity = newActivities[action.payload.activityIndex];
         if (action.payload.currentValue >= activity.maxValue) {
            const {
               level,
               maxValue
            } = increaseLevels(action.payload.currentValue, activity.level, activity.maxValue, activity.increasement, activity.increasementFactor);
            newActivities[action.payload.activityIndex] = {...activity, level, maxValue};
         }
      })
   }
   if (action.type === GamificationActionTypes.DECREASE_PROGRESS) {
      return produce<StatsProps[]>(oldActivities, newActivities => {
         const activity = newActivities[action.payload.activityIndex];
         const {
            level,
            maxValue
         } = decreaseLevels(action.payload.currentValue, activity.level, activity.maxValue, activity.increasement, activity.increasementFactor);
         newActivities[action.payload.activityIndex] = {
            ...activity,
            currentValue: action.payload.currentValue,
            level,
            maxValue
         };
      })
   }
   if (action.type === GamificationActionTypes.UPDATE_ADDITIONAL_CELL_INFO) {
      return produce<StatsProps[]>(oldActivities, newActivities => {
         const cell = newActivities[action.payload.activityIndex].calendarEntries[action.payload.date];
         if (cell) {
            cell.info = action.payload.info;
            newActivities[action.payload.activityIndex].calendarEntries[action.payload.date] = cell;
         }
      })
   }
   return oldActivities;
}