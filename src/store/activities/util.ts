import {ActivityType} from "./types";

export const getInitialMaxValue = (activity: ActivityType): number => {
   switch (activity) {
      case "Hours":
         return 1;
      case "Days":
         return 1;
      case "Minutes":
         return 1;
      case "Pages":
         return 1;
      case "Times":
         return 1;
      default:
         return 1;
   }
}