import {Badge} from "./types";
import {GamificationModel} from "../types";
import produce from "immer";
import {BadgeActionType, BadgesActions} from "./badgesActions";

const initialState: Badge[] = [];

export const badgeReducer = (oldBadges: GamificationModel["badges"] = initialState, action: BadgesActions) => {
   if (action.type === BadgeActionType.ADD_BADGE) {
      return produce(oldBadges, newBadges => {
         if (!newBadges.find((badge) => badge.title !== action.payload.title)) {
            newBadges.push(action.payload);
         }
      })
   }
   if (action.type === BadgeActionType.REMOVE_BADGE) {
      return produce(oldBadges, newBadges => {
         newBadges.splice(action.payload, 1);
      })
   }
   return oldBadges;
}