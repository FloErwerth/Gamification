import {StatsProps} from "../../components/stats/Stats";
import {GamificationActionTypes} from "../types";

export type ActivityActions = { type: GamificationActionTypes.ADD_ACTIVITY, payload: StatsProps } | {type: GamificationActionTypes.SET_ACTIVITIES, payload: StatsProps[] }

export function addActivity(payload: StatsProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function setActivities(payload: StatsProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}
