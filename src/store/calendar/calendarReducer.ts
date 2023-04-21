import {CalendarActions, CalendarActionType} from "./calendarActions";
import produce from "immer";
import {InitialGamificiationState} from "../store";

export const calendarReducer = (oldCalendar = InitialGamificiationState.calendar, action: CalendarActions) => {
   if (action.type === CalendarActionType.SET_DAYS_IN_MONTH) {
      return produce(oldCalendar, newCalendar => {
         newCalendar.daysInMonth = action.payload.daysInMonth;
      })
   }
   if (action.type === CalendarActionType.SET_CURRENTLY_SELECTED_MONTH) {
      return produce(oldCalendar, newCalendar => {
         newCalendar.currentlySelectedMonth = action.payload.month;
      })
   }
   return oldCalendar;
}