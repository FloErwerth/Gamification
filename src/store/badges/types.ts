import {PREDEFINED_STATS_SET, PredefinedStatsSet} from "../../types/predefinedActivities";

type BadgeTypeEnum = "OVERALL" | "ACTIVITY";

export enum OverallBadges {
   FIRST_ACTIVITY = "FIRST_ACTIVITY"
}

type OverallBadgesEnum = OverallBadges.FIRST_ACTIVITY;

enum JoggingBadges {
   KM = "KM", TIME = "TIME",
}

type JoggingBadgesEnum = JoggingBadges.KM | JoggingBadges.TIME;

export const ActivityBadgesMap = (predefinedActivity: PredefinedStatsSet) => PREDEFINED_STATS_SET.transform((stat) => {
   switch (stat) {
      case "Jogging":
         return JoggingBadges;
      case "Custom":
         return ""
   }
}).parse(predefinedActivity);

type ActivityBadge<PredefinedActivity> = PredefinedActivity extends "JOGGING" ? JoggingBadgesEnum : "";

type PredefinedBadges = `${PredefinedStatsSet}/${ActivityBadge<PredefinedStatsSet>}`;
type BadgeId = `${BadgeTypeEnum}/${OverallBadgesEnum | PredefinedBadges}`

export type Badge = { id: BadgeId, title: string, description: string };

export function generateBadge(id: BadgeId, title: string, description: string): Badge {
   return {id, title, description};
}