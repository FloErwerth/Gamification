import {GamificationModel} from "../types";
import {BadgeMap, OverallBadges} from "./types";

export const getBadges = ({badges}: GamificationModel) => badges.map((badgeId) => BadgeMap(badgeId));

export const getNotEarnedBadges = ({badges}: GamificationModel) => {
   const badgeIds = badges.map((badge) => badge);
   return OverallBadges.options.filter(item => !badgeIds.includes(item)).map((badgeId) => BadgeMap(badgeId))
};
