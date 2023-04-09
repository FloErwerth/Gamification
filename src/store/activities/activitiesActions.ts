import {GamificationActionTypes} from "../types";
import {StatsProps} from "./types";

type UpdateActivityPayload = { index: number, activity: StatsProps };
type ChangeActivityProgress = { index: number, currentValue: StatsProps["currentValue"] }
export type ActivitiesActions =
   { type: GamificationActionTypes.SET_ACTIVE_ACTIVITY, payload: number }
   | { type: GamificationActionTypes.ADD_ACTIVITY, payload: StatsProps }
   | { type: GamificationActionTypes.SET_ACTIVITIES, payload: StatsProps[] }
   | { type: GamificationActionTypes.CHANGE_ACTIVITY, payload: UpdateActivityPayload }
   | { type: GamificationActionTypes.INCREASE_PROGRESS, payload: ChangeActivityProgress }
   | { type: GamificationActionTypes.DECREASE_PROGRESS, payload: ChangeActivityProgress }

export function addActivity(payload: StatsProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function decreaseActivityProgress(payload: ChangeActivityProgress) {
   return {type: GamificationActionTypes.DECREASE_PROGRESS, payload}
}

export function increaseActivityProgress(payload: ChangeActivityProgress) {
   return {type: GamificationActionTypes.INCREASE_PROGRESS, payload}
}

export function updateActivity(payload: UpdateActivityPayload) {
   return {type: GamificationActionTypes.CHANGE_ACTIVITY, payload}
}

export function setActivities(payload: StatsProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}


