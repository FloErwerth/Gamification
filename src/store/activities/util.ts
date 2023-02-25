import {ActivityType} from "./types";

export const getMaxValueFromLevelAndActivity = (level: number, activity: ActivityType): number => {
   switch (activity) {
      case "Hours":
         return level;
      case "Days":
         return level * 0.25;
      case "Minutes":
         return level * 20;
      case "Pages":
         return level * 20;
      default:
         return 0;
   }
}