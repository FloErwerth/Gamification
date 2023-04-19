import {ActivityProps, DateType} from "./types";
import {CellInfo} from "../../components/OpenedActivity/OpenedActivity";
import {GamificationActionTypes} from "../actions";
import {Stat} from "./predefinedActivities";
import {generateAction} from "../utils";

type UpdateActivityPayload = { activityIndex: number, activity: ActivityProps };
type ChangeActivityProgressPayload = { activityIndex: number, currentValue: ActivityProps["currentValue"] };
type UpdateAdditionalCellInfoPayload = { activityIndex: number, info: CellInfo["info"], date: DateType };
type UpdateCellsPayload = { activityIndex: number, cell: CellInfo, date: DateType };
type UpdateStatsPayload = { stats: Stat[], activityIndex: number, date: DateType };

export type ActivitiesActions =
   | { type: GamificationActionTypes.ADD_ACTIVITY, payload: ActivityProps }
   | { type: GamificationActionTypes.SET_ACTIVITIES, payload: ActivityProps[] }
   | { type: GamificationActionTypes.CHANGE_ACTIVITY, payload: UpdateActivityPayload }
   | { type: GamificationActionTypes.UPDATE_ADDITIONAL_CELL_INFO, payload: UpdateAdditionalCellInfoPayload }
   | { type: GamificationActionTypes.UPDATE_ACTIVITY_CELLS, payload: UpdateCellsPayload }
   | { type: GamificationActionTypes.UPDATE_STATS, payload: UpdateStatsPayload }


export function updateStats(payload: UpdateStatsPayload) {
   return generateAction(GamificationActionTypes.UPDATE_STATS, payload);
}

export function addActivity(payload: ActivityProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function updateActivity(payload: UpdateActivityPayload) {
   return {type: GamificationActionTypes.CHANGE_ACTIVITY, payload}
}

export function setActivities(payload: ActivityProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}

export function updateAdditionalCellInfo(payload: UpdateAdditionalCellInfoPayload) {
   return {type: GamificationActionTypes.UPDATE_ADDITIONAL_CELL_INFO, payload};
}

export function updateCells(payload: UpdateCellsPayload) {
   return {type: GamificationActionTypes.UPDATE_ACTIVITY_CELLS, payload}
}


