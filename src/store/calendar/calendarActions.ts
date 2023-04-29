import {generateAction} from "../utils";

export enum CalendarActionType {
   SET_DAYS_IN_MONTH = "gamification/calendar/date",
   SET_CURRENTLY_SELECTED_MONTH = "gamification/calendar/selected_month",
}

type SetDaysInMonth = { daysInMonth: number }
type CurrentlySelectedMonth = { month: number }
export type CalendarActions =
   { type: CalendarActionType.SET_DAYS_IN_MONTH, payload: SetDaysInMonth }
   | { type: CalendarActionType.SET_CURRENTLY_SELECTED_MONTH, payload: CurrentlySelectedMonth }

export const setDaysInMonth = (payload: SetDaysInMonth) => {
   return generateAction(CalendarActionType.SET_DAYS_IN_MONTH, payload)
}
export const setCurrentlySelectedMonth = (payload: CurrentlySelectedMonth) => {
   return generateAction(CalendarActionType.SET_CURRENTLY_SELECTED_MONTH, payload);
}