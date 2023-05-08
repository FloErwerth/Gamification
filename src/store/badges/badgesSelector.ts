import {GamificationModel} from "../types";
import {BadgeId, BadgeMap, BadgeSignature, PersonalBadges} from "./types";
import {createSelector} from "@reduxjs/toolkit";
import {getBadgeSignature} from "./util";

export const getBadges = ({badges}: GamificationModel) => badges.map((badgeId) => BadgeMap(badgeId));

export const getNotEarnedBadges = ({badges}: GamificationModel) => {
   const badgeIds = badges.map((badgeId) => badgeId);
   return PersonalBadges.options.filter(item => !badgeIds.includes(item)).map((badgeId) => BadgeMap(badgeId))
};

export const getSortedBadges = createSelector([getBadges, getNotEarnedBadges], (earnedBadges, notEarnedBadges) => {

   const sortedBadges: { badges: BadgeSignature } = {badges: {}};

   const sort = (badgeId: BadgeId, earned?: boolean) => {
      const parts = getBadgeSignature(badgeId);
      if (parts) {
         const generalType = parts.generalType;
         const subType = parts.subtype;

         if (!sortedBadges.badges[generalType]) {
            sortedBadges.badges[generalType] = {};
         }

         if (!sortedBadges.badges[generalType][subType]) {
            sortedBadges.badges[generalType][subType] = [];
         }

         if (sortedBadges.badges[generalType] && sortedBadges.badges[generalType][subType]) {
            sortedBadges.badges[generalType][subType]?.push({id: badgeId, earned});
         }
      }
   }

   earnedBadges.forEach(badge => {
      if (badge) {
         sort(badge.id, true);
      }
   });

   notEarnedBadges.forEach(badge => {
      if (badge) {
         sort(badge.id, false);
      }
   });

   return sortedBadges
})
