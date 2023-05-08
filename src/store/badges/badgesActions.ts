import {BadgeId} from "./types";
import {generateAction} from "../utils";

export enum BadgeActionType {
   ADD_BADGE = "gamification/badge/add",
   REMOVE_BADGE = "gamification/badge/remove",
   SET_BADGES = "gamification/badge/set",
   CHECK_BADGES = "gamification/badge/check",
}

export type BadgesActions =
   { type: BadgeActionType.ADD_BADGE, payload: BadgeId }
   | { type: BadgeActionType.REMOVE_BADGE, payload: number }
   | { type: BadgeActionType.SET_BADGES, payload: BadgeId[] }
   | { type: BadgeActionType.CHECK_BADGES, payload: undefined }

export const addBadge = (payload: BadgeId) => generateAction(BadgeActionType.ADD_BADGE, payload);
export const removeBadge = (payload: number) => generateAction(BadgeActionType.REMOVE_BADGE, payload);
export const setBadges = (payload: BadgeId[]) => generateAction(BadgeActionType.SET_BADGES, payload);