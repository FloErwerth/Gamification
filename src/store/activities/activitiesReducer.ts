import {GamificationActionTypes} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivitiesActions} from "./activitiesActions";
import produce from "immer";
import {DateType, StatsProps} from "./types";

const getCleanedCalendar = (calendar: StatsProps["calendarEntries"]): StatsProps["calendarEntries"] => {
   const filteredValues = Object.keys(calendar).filter((entry) => {
      return calendar[entry as DateType].marked;
   })
   return filteredValues.reduce((previousValue, currentValue) => {
      return {[currentValue]: {...calendar[currentValue as DateType]}}
   }, {});
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
         newActivities[action.payload.index] = action.payload.activity;
         newActivities[action.payload.index].calendarEntries = getCleanedCalendar(newActivities[action.payload.index].calendarEntries);
      })
   }
   return oldActivities;
}