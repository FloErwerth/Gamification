import {generateAction} from "../utils";
import {GamificationActionTypes} from "../actions";


type SetDaysInMonth = { daysInMonth: number }
export type CalendarActions = { type: GamificationActionTypes.SET_DAYS_IN_MONTH, payload: SetDaysInMonth }

export const setDaysInMonth = (payload: SetDaysInMonth) => {
   return generateAction(GamificationActionTypes.SET_DAYS_IN_MONTH, payload)
}