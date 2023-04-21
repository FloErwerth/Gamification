import {Badge} from "./types";
import {generateAction} from "../utils";

export enum BadgeActionType {
   ADD_BADGE = "gamification/badge/add",
   REMOVE_BADGE = "gamification/badge/remove"
}

export type BadgesActions =
   { type: BadgeActionType.ADD_BADGE, payload: Badge }
   | { type: BadgeActionType.REMOVE_BADGE, payload: number }

export const addBadge = (payload: Badge) => generateAction(BadgeActionType.ADD_BADGE, payload);
export const removeBadge = (payload: number) => generateAction(BadgeActionType.REMOVE_BADGE, payload);