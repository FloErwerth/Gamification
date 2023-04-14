import {GamificationActionTypes} from "../actions";

export type ActivityActions = { type: GamificationActionTypes.SET_ACTIVE_ACTIVITY, payload: number }

export function setActiveActivity(payload: number) {
   return {type: GamificationActionTypes.SET_ACTIVE_ACTIVITY, payload}
}