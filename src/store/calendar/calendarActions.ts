import {generateAction} from "../utils";
import {GamificationActionTypes} from "../actions";


type SetDaysInMonth = { daysInMonth: number }
type CurrentlySelectedMonth = { month: number }
export type CalendarActions =
   { type: GamificationActionTypes.SET_DAYS_IN_MONTH, payload: SetDaysInMonth }
   | { type: GamificationActionTypes.SET_CURRENTLY_SELECTED_MONTH, payload: CurrentlySelectedMonth }

export const setDaysInMonth = (payload: SetDaysInMonth) => {
   return generateAction(GamificationActionTypes.SET_DAYS_IN_MONTH, payload)
}
export const setCurrentlySelectedMonth = (payload: CurrentlySelectedMonth) => {
   return generateAction(GamificationActionTypes.SET_CURRENTLY_SELECTED_MONTH, payload);
}