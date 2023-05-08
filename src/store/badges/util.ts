import {BadgeId, BadgeSignature, BadgeSubtype, GeneralBadgeType} from "./types";

export const getBadgeSignature = (badgeId?: BadgeId): { generalType: GeneralBadgeType, subtype: BadgeSubtype } | undefined => {
   if (badgeId) {
      const splits = badgeId.split("/");
      const generalType = splits[0] as GeneralBadgeType;
      const subtype = splits[1] as BadgeSubtype;
      return {generalType, subtype}
   }
   return undefined;
}

export const generateBadgeId = (signature: BadgeSignature): BadgeId => {
   return Object.values(signature).join("/") as BadgeId;
}