import {z} from "zod";
import {
   FifthActivityBadge,
   FirstActivityBadge,
   FirstDayRegisteredBadge,
   SeventhDayRegisteredBadge,
   ThirtyDayRegisteredBadge
} from "../../media/badgeSvgs";


export type BadgeSignature = { [generalBadgeType in GeneralBadgeType]?: { [badgeSubtype in BadgeSubtype]?: { id: BadgeId, earned?: boolean }[] } };
export const GeneralBadgeType = z.enum(["Personal"] as const);
export type GeneralBadgeType = z.infer<typeof GeneralBadgeType>;

export type BadgeSubtype = "Registration" | "Activities";

export type BadgeSpecifier = "FIRST" | "FIVE" | "SEVEN" | "THIRTY"
export type BadgeId = `${GeneralBadgeType}/${BadgeSubtype}/${BadgeSpecifier}`;

export type BadgeType = { id: BadgeId, title: string, description: string, BadgeSVG: React.FC<React.SVGProps<SVGSVGElement>> }


export const PersonalBadges = z.enum(["Personal/Activities/FIRST", "Personal/Activities/FIVE", "Personal/Registration/FIRST", "Personal/Registration/SEVEN", "Personal/Registration/THIRTY"]);
export const PersonalBadgesEnum = PersonalBadges.Enum;


export const BadgeMap = (badgeId: BadgeId) => PersonalBadges.transform((badgeEnum: BadgeId | undefined): BadgeType | undefined => {
   switch (badgeEnum) {
      case "Personal/Activities/FIRST":
         return {
            id: badgeEnum,
            title: "First Activity",
            description: "You have created your first activity",
            BadgeSVG: FirstActivityBadge
         }
      case "Personal/Activities/FIVE":
         return {
            id: badgeEnum,
            title: "Fifth Activity",
            description: "You have created your fifth activity",
            BadgeSVG: FifthActivityBadge
         }
      case "Personal/Registration/FIRST":
         return {
            id: badgeEnum,
            title: "Registered 1 day",
            description: "You are registered 1 day",
            BadgeSVG: FirstDayRegisteredBadge
         };
      case "Personal/Registration/SEVEN":
         return {
            id: badgeEnum,
            title: "Registered 7 days",
            description: "You are registered a week",
            BadgeSVG: SeventhDayRegisteredBadge
         };
      case "Personal/Registration/THIRTY":
         return {
            id: badgeEnum,
            title: "Registered 30 days",
            description: "You are registered a month",
            BadgeSVG: ThirtyDayRegisteredBadge
         };
      default:
         return undefined;
   }
}).parse(badgeId);
