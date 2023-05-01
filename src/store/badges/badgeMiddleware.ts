import {Dispatch, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {ActivitiesActionType} from "../activities/activitiesActions";
import {GamificationActions, GamificationModel} from "../types";
import {BadgeActionType} from "./badgesActions";
import {generateAction} from "../utils";
import {addOverallBadgeInDatabase} from "../../../firebase";
import {OverallBadgesEnum} from "./types";

export const badgeMiddleware: Middleware<{}, GamificationModel, Dispatch<GamificationActions>> = (api: MiddlewareAPI<Dispatch<GamificationActions>, GamificationModel>) => (next: Dispatch<GamificationActions>) => (action: GamificationActions) => {
   if (action.type === ActivitiesActionType.ADD_ACTIVITY) {
      if (api.getState().activities.length === 0 || (api.getState().activities.length > 0 && !api.getState().badges.includes("OVERALL/ACTIVITY/FIRST"))) {
         const badge = OverallBadgesEnum["OVERALL/ACTIVITY/FIRST"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
      if (api.getState().activities.length === 4 || (api.getState().activities.length > 4 && !api.getState().badges.includes("OVERALL/ACTIVITY/FIVE"))) {
         const badge = OverallBadgesEnum["OVERALL/ACTIVITY/FIVE"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
   }

   next(action);
}