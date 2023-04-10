import {GamificationActionTypes} from "../types";
import {DateType, StatsProps} from "./types";
import {CellInfo} from "../../components/OpenedActivity/OpenedActivity";

type UpdateActivityPayload = { activityIndex: number, activity: StatsProps };
type ChangeActivityProgressPayload = { activityIndex: number, currentValue: StatsProps["currentValue"] };
type UpdateAdditionalCellInfoPayload = { activityIndex: number, info: CellInfo["info"], date: DateType };
type UpdateCellsPayload = { activityIndex: number, cell: CellInfo, date: DateType };

export type ActivitiesActions =
   | { type: GamificationActionTypes.ADD_ACTIVITY, payload: StatsProps }
   | { type: GamificationActionTypes.SET_ACTIVITIES, payload: StatsProps[] }
   | { type: GamificationActionTypes.CHANGE_ACTIVITY, payload: UpdateActivityPayload }
   | { type: GamificationActionTypes.INCREASE_PROGRESS, payload: ChangeActivityProgressPayload }
   | { type: GamificationActionTypes.DECREASE_PROGRESS, payload: ChangeActivityProgressPayload }
   | { type: GamificationActionTypes.UPDATE_ADDITIONAL_CELL_INFO, payload: UpdateAdditionalCellInfoPayload }
   | { type: GamificationActionTypes.UPDATE_ACTIVITY_CELLS, payload: UpdateCellsPayload }

export function addActivity(payload: StatsProps) {
   return {type: GamificationActionTypes.ADD_ACTIVITY, payload};
}

export function decreaseActivityProgress(payload: ChangeActivityProgressPayload) {
   return {type: GamificationActionTypes.DECREASE_PROGRESS, payload}
}

export function increaseActivityProgress(payload: ChangeActivityProgressPayload) {
   return {type: GamificationActionTypes.INCREASE_PROGRESS, payload}
}

export function updateActivity(payload: UpdateActivityPayload) {
   return {type: GamificationActionTypes.CHANGE_ACTIVITY, payload}
}

export function setActivities(payload: StatsProps[]) {
   return {type: GamificationActionTypes.SET_ACTIVITIES, payload}
}

export function updateAdditionalCellInfo(payload: UpdateAdditionalCellInfoPayload) {
   return {type: GamificationActionTypes.UPDATE_ADDITIONAL_CELL_INFO, payload};
}

export function updateCells(payload: UpdateCellsPayload) {
   return {type: GamificationActionTypes.UPDATE_ACTIVITY_CELLS, payload}
}


