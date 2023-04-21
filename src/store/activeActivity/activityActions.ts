import {generateAction} from "../utils";

export enum ActiveActivityActionType {
   SET_ACTIVE_ACTIVITY = "gamification/activities/set_active_activity",
}

export type ActivityActions = { type: ActiveActivityActionType.SET_ACTIVE_ACTIVITY, payload: number }

export function setActiveActivity(payload: number) {
   return generateAction(ActiveActivityActionType.SET_ACTIVE_ACTIVITY, payload);
}