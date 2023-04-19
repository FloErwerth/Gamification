import {ActivityProps, CellInfo, DateType} from "./types";
import {GamificationActionTypes} from "../actions";
import {generateAction} from "../utils";

type UpdateCell = { activityIndex: number, date: DateType, content: CellInfo };
type DeleteCell = { activityIndex: number, date: DateType };
type DeleteActivityPayload = { activityIndex: number };

export type ActivitiesActions =
   | { type: GamificationActionTypes.ADD_ACTIVITY, payload: ActivityProps }
   | { type: GamificationActionTypes.SET_ACTIVITIES, payload: ActivityProps[] }
   | { type: GamificationActionTypes.UPDATE_CELL, payload: UpdateCell }
   | { type: GamificationActionTypes.DELETE_CELL, payload: DeleteCell }
   | { type: GamificationActionTypes.DELETE_ACTIVITY, payload: DeleteActivityPayload }


export function addActivity(payload: ActivityProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function setActivities(payload: ActivityProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}

export function deleteActivity(payload: DeleteActivityPayload) {
   return generateAction(GamificationActionTypes.DELETE_ACTIVITY, payload);
}

export function updateCell(payload: UpdateCell) {
   return {type: GamificationActionTypes.UPDATE_CELL, payload}
}

export function deleteCell(payload: DeleteCell) {
   return generateAction(GamificationActionTypes.DELETE_CELL, payload)
}


