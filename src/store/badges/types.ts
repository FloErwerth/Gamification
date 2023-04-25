type BadgeTypeEnum = "OVERALL" | "ACTIVITY";

export enum OverallBadges {
   FIRST_ACTIVITY = "FIRST_ACTIVITY", FIFTH_ACTIVITY = "FIFTH_ACTIVITY"
}

type OverallBadgesEnum = OverallBadges;

export type BadgeId = `${BadgeTypeEnum}/${OverallBadgesEnum}`

export type Badge = { id: BadgeId, title: string, description: string };

export function generateBadge(id: BadgeId, title: string, description: string): Badge {
   return {id, title, description};
}