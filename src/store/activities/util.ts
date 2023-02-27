import {ActivityType} from "./types";

export const getMaxValueFromLevelAndActivity = (level: number, activity: ActivityType): number => {
   switch (activity) {
      case "Hours":
         return level;
      case "Days":
         return level;
      case "Minutes":
         return level * 5;
      case "Pages":
         return level * 5;
      case "Times":
         return level;
      default:
         return 0;
   }
}