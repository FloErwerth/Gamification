import {z} from "zod";
import {
   FifthActivityBadge,
   FirstActivityBadge,
   FirstDayRegisteredBadge,
   SeventhDayRegisteredBadge,
   ThirtyDayRegisteredBadge
} from "../../media/badgeSvgs";

export const OverallBadges = z.enum(["OVERALL/ACTIVITY/FIRST", "OVERALL/ACTIVITY/FIVE", "OVERALL/REGISTERED/FIRST", "OVERALL/REGISTERED/SEVEN", "OVERALL/REGISTERED/THIRTY"]);
export const OverallBadgesEnum = OverallBadges.Enum;
type OverallBadgesType = z.infer<typeof OverallBadges>;


export const BadgeMap = (badgeId: BadgeId) => OverallBadges.transform((badgeEnum): BadgeType => {
   switch (badgeEnum) {
      case "OVERALL/ACTIVITY/FIRST":
         return {
            id: badgeEnum,
            title: "First Activity",
            description: "You have created your first activity",
            SVG: FirstActivityBadge
         }
      case "OVERALL/ACTIVITY/FIVE":
         return {
            id: badgeEnum,
            title: "Fifth Activity",
            description: "You have created your fifth activity",
            SVG: FifthActivityBadge
         }
      case "OVERALL/REGISTERED/FIRST":
         return {
            id: badgeEnum,
            title: "Registered 1 day",
            description: "You are registered 1 day",
            SVG: FirstDayRegisteredBadge
         };
      case "OVERALL/REGISTERED/SEVEN":
         return {
            id: badgeEnum,
            title: "Registered 7 days",
            description: "You are registered a week",
            SVG: SeventhDayRegisteredBadge
         };
      case "OVERALL/REGISTERED/THIRTY":
         return {
            id: badgeEnum,
            title: "Registered 30 days",
            description: "You are registered a month",
            SVG: ThirtyDayRegisteredBadge
         };

   }
}).parse(badgeId);

export const GeneralBadgeType = z.enum(["OVERALL"]);
export type GeneralBadgeType = z.infer<typeof GeneralBadgeType>;

export const BadgeSubtype = z.enum(["REGISTERED", "ACTIVITY"]);
export type BadgeSubtypeType = z.infer<typeof BadgeSubtype>

export type BadgeSpecifier<Subtype extends BadgeSubtypeType> = Subtype extends "REGISTERED" ? "FIRST" | "SEVEN" | "THIRTY" : "FIRST" | "FIVE";
export type BadgeId = `${GeneralBadgeType}/${BadgeSubtypeType}/${BadgeSpecifier<BadgeSubtypeType>}`;

export type BadgeType = { id: BadgeId, title: string, description: string, SVG: React.FC<React.SVGProps<SVGSVGElement>> };
