type BadgeTypeEnum = "OVERALL" | "ACTIVITY";

export enum OverallBadges {
   FIRST_ACTIVITY = "FIRST_ACTIVITY"
}

type OverallBadgesEnum = OverallBadges.FIRST_ACTIVITY;

export type BadgeId = `${BadgeTypeEnum}/${OverallBadgesEnum}`

export type Badge = { id: BadgeId, title: string, description: string };

export function generateBadge(id: BadgeId, title: string, description: string): Badge {
   return {id, title, description};
}