import {GamificationActionTypes} from "../types";
import {Date, StatsProps} from "../../components/activity/types";

type UpdateActivityPayload = { index: number, activity: StatsProps };
type UpdateActivityCalendarCell = { activityIndex: number, date: Date, marked: boolean };
export type ActivitiesActions =
   { type: GamificationActionTypes.SET_ACTIVE_ACTIVITY, payload: number }
   | { type: GamificationActionTypes.ADD_ACTIVITY, payload: StatsProps }
   | { type: GamificationActionTypes.SET_ACTIVITIES, payload: StatsProps[] }
   | { type: GamificationActionTypes.CHANGE_ACTIVITY, payload: UpdateActivityPayload }
   | { type: GamificationActionTypes.DELETE_ACTIVITY, payload: StatsProps }
   | { type: GamificationActionTypes.UPDATE_ACTIVITY_CALENDAR_CELL, payload: UpdateActivityCalendarCell }

export function addActivity(payload: StatsProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function updateActivity(payload: UpdateActivityPayload) {
   return {type: GamificationActionTypes.CHANGE_ACTIVITY, payload}
}

export function deleteActivity(payload: StatsProps) {
   return {type: GamificationActionTypes.DELETE_ACTIVITY, payload};
}

export function setActivities(payload: StatsProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}

export function updateActivityCalendarCell(payload: UpdateActivityCalendarCell) {
   return {type: GamificationActionTypes.UPDATE_ACTIVITY_CALENDAR_CELL, payload}
}


