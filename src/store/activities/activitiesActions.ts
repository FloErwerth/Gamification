import {StatsProps} from "../../components/activity/ActivityWrapper";
import {GamificationActionTypes} from "../types";

export type ActivitiesActions = { type: GamificationActionTypes.SET_ACTIVE_ACTIVITY, payload: number } |{ type: GamificationActionTypes.ADD_ACTIVITY, payload: StatsProps } | {type: GamificationActionTypes.SET_ACTIVITIES, payload: StatsProps[] } 

export function addActivity(payload: StatsProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function setActivities(payload: StatsProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}

