import {Dispatch, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {ActivitiesActionType} from "../activities/activitiesActions";
import {GamificationActions, GamificationModel} from "../types";
import {BadgeActionType} from "./badgesActions";
import {generateAction} from "../utils";
import {addOverallBadgeInDatabase} from "../../../firebase";
import {BadgeId, PersonalBadgesEnum} from "./types";
import {AuthenticationActionType} from "../authentication/authActions";
import {getDaysSinceCreation} from "../authentication/authSelectors";

const hasBadge = (badge: BadgeId, badges: BadgeId[]) => {
   return badges.includes(badge);
}

export const middleware: Middleware<{}, GamificationModel, Dispatch<GamificationActions>> = (api: MiddlewareAPI<Dispatch<GamificationActions>, GamificationModel>) => (next: Dispatch<GamificationActions>) => (action: GamificationActions) => {

   if (action.type === BadgeActionType.CHECK_BADGES || action.type === ActivitiesActionType.ADD_ACTIVITY) {
      const activities = api.getState().activities;
      const badges = api.getState().badges;
      if (activities.length === 0 || (activities.length > 0 && !hasBadge("Personal/Activities/FIRST", badges))) {
         const badge = PersonalBadgesEnum["Personal/Activities/FIRST"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
      if (activities.length === 4 || (activities.length > 4 && !hasBadge("Personal/Activities/FIVE", badges))) {
         const badge = PersonalBadgesEnum["Personal/Activities/FIVE"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
   }

   if (action.type === BadgeActionType.CHECK_BADGES || action.type === AuthenticationActionType.LOGIN && api.getState().authentication.loggedIn) {
      const badges = api.getState().badges;
      const daysSinceLogin = getDaysSinceCreation(api.getState());
      if (daysSinceLogin >= 0 && !hasBadge("Personal/Registration/FIRST", badges)) {
         const badge = PersonalBadgesEnum["Personal/Registration/FIRST"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
      if (daysSinceLogin >= 7 && !hasBadge("Personal/Registration/SEVEN", badges)) {
         const badge = PersonalBadgesEnum["Personal/Registration/SEVEN"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
      if (daysSinceLogin >= 30 && !hasBadge("Personal/Registration/THIRTY", badges)) {
         const badge = PersonalBadgesEnum["Personal/Registration/THIRTY"]
         api.dispatch(generateAction(BadgeActionType.ADD_BADGE, badge));
         addOverallBadgeInDatabase(api.getState().authentication.userId, badge);
      }
   }

   if (action.type === AuthenticationActionType.LOGIN && !action.payload) {
      location.reload();
   }

   next(action);
}