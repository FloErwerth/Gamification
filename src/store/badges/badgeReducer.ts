import {GamificationModel} from "../types";
import produce from "immer";
import {BadgeActionType, BadgesActions} from "./badgesActions";
import {BadgeId} from "./types";

const initialState: BadgeId[] = [];

export const badgeReducer = (oldBadges: GamificationModel["badges"] = initialState, action: BadgesActions) => {
   if (action.type === BadgeActionType.ADD_BADGE) {
      return produce(oldBadges, newBadges => {
         if (!newBadges.find((badgeId) => badgeId === action.payload)) {
            newBadges.push(action.payload);
         }
      })
   }
   if (action.type === BadgeActionType.REMOVE_BADGE) {
      return produce(oldBadges, newBadges => {
         newBadges.splice(action.payload, 1);
      })
   }
   if (action.type === BadgeActionType.SET_BADGES) {
      return produce(oldBadges, newBadges => {
         action.payload;
      })
   }
   return oldBadges;
}