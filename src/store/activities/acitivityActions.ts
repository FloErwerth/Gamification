import {StatsProps} from "../../components/stats/Stats";
import {GamificationActionTypes} from "../types";

export type AddPayload = Pick<StatsProps, "name" | "type">
export type ActivityActions = { type: GamificationActionTypes.ADD_ACTIVITY, payload: AddPayload }

export function addActivity(payload: AddPayload): ActivityActions {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload}
}
