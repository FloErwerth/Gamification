import {Dispatch, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {GamificationActions} from "../store";
import {ActivitiesActionType} from "../activities/activitiesActions";
import {GamificationModel} from "../types";
import {BadgeActionType} from "./badgesActions";
import {generateAction} from "../utils";
import {generateBadge} from "./types";
import {addOverallBadgeInDatabase} from "../../../firebase";

export const badgeMiddleware: Middleware<{}, GamificationModel, Dispatch<GamificationActions>> = (api: MiddlewareAPI<Dispatch<GamificationActions>, GamificationModel>) => (next: Dispatch<GamificationActions>) => (action: GamificationActions) => {
   if (action.type === ActivitiesActionType.ADD_ACTIVITY) {
      if (api.getState().activities.length === 0 || api.getState().badges.find((badge) => badge.id === "OVERALL/FIRST_ACTIVITY") === undefined) {
         const badge = generateBadge(`OVERALL/FIRST_ACTIVITY`, "First activity added", "The user has added its first activity");
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge.id);
      }
   }

   next(action);
}