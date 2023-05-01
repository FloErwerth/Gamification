import {BadgeId, BadgeSignature, BadgeSpecifier, BadgeSubtypeType, GeneralBadgeType} from "./types";

export const getBadgeSignature = (badgeId: BadgeId): BadgeSignature => {
   const splits = badgeId.split("/");
   const generalType = splits[0] as GeneralBadgeType;
   const subtype = splits[1] as BadgeSubtypeType;
   const specifier = splits[2] as BadgeSpecifier<typeof subtype>;
   return {generalType, subtype, specifier}
}

export const generateBadgeId = (signature: BadgeSignature): BadgeId => {
   return Object.values(signature).join("/") as BadgeId;
}