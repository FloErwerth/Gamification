import {CalendarActions} from "./calendarActions";
import {GamificationActionTypes} from "../actions";
import produce from "immer";
import {InitialGamificiationState} from "../store";

export const calendarReducer = (oldCalendar = InitialGamificiationState.calendar, action: CalendarActions) => {
   if (action.type === GamificationActionTypes.SET_DAYS_IN_MONTH) {
      return produce(oldCalendar, newCalendar => {
         newCalendar.daysInMonth = action.payload.daysInMonth;
      })
   }
   if (action.type === GamificationActionTypes.SET_CURRENTLY_SELECTED_MONTH) {
      return produce(oldCalendar, newCalendar => {
         newCalendar.currentlySelectedMonth = action.payload.month;
      })
   }
   return oldCalendar;
}