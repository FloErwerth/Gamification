import {ActivityProps, CellInfo, DateType} from "./types";
import {generateAction} from "../utils";

type UpdateCell = { activityIndex: number, date: DateType, content: CellInfo };
type DeleteCell = { activityIndex: number, date: DateType };
type DeleteActivityPayload = { activityIndex: number };

export enum ActivitiesActionType {
   ADD_ACTIVITY = "gamification/activity/add",
   DELETE_ACTIVITY = "gamification/activity/delete",
   SET_ACTIVITIES = "gamification/activity/set",
   UPDATE_CELL = "gamification/cells/update",
   DELETE_CELL = "gamification/cells/delte",
}

export type ActivitiesActions =
   | { type: ActivitiesActionType.ADD_ACTIVITY, payload: ActivityProps }
   | { type: ActivitiesActionType.SET_ACTIVITIES, payload: ActivityProps[] }
   | { type: ActivitiesActionType.UPDATE_CELL, payload: UpdateCell }
   | { type: ActivitiesActionType.DELETE_CELL, payload: DeleteCell }
   | { type: ActivitiesActionType.DELETE_ACTIVITY, payload: DeleteActivityPayload }


export function addActivity(payload: ActivityProps) {
   return generateAction(ActivitiesActionType.ADD_ACTIVITY, payload);
}

export function setActivities(payload: ActivityProps[]) {
   return generateAction(ActivitiesActionType.SET_ACTIVITIES, payload);

}

export function deleteActivity(payload: DeleteActivityPayload) {

   return generateAction(ActivitiesActionType.DELETE_ACTIVITY, payload);
}

export function updateCell(payload: UpdateCell) {
   return generateAction(ActivitiesActionType.UPDATE_CELL, payload)
}

export function deleteCell(payload: DeleteCell) {
   return generateAction(ActivitiesActionType.DELETE_CELL, payload)
}


