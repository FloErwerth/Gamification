import {z} from "zod";

export const PREDEFINED_STATS_SET = z.enum(["Custom", "Jogging"]);
export type PredefinedStatsSet = z.infer<typeof PREDEFINED_STATS_SET>;
export type Stat = { name: string, description: string, value?: number, deletable?: boolean };
export const StatEnum = z.enum(["Distance", "Time", "Calories", "Steps", "Pages written", "Pages read", "Pictures drawn"]);
export type StatEnum = z.infer<typeof StatEnum>;

export const assambleFields = (statSet: PredefinedStatsSet) => {
   switch (statSet) {
      case "Jogging":
         return [StatMap("Distance"), StatMap("Time")];
      case "Custom":
         return [];
   }
}

export const StatMap = (field: StatEnum) => StatEnum.transform((field): Stat => {
   switch (field) {
      case "Distance":
         return {name: field, description: "Example: 12km"};
      case "Time":
         return {
            name: field,
            description: "Example: 38 minutes"
         };
      case "Calories":
         return {
            name: field,
            description: "Example: 365 calories burnt"
         };
      case "Steps": {
         return {
            name: field,
            description: "Example: 10532 steps"
         }
      }
      case "Pages read":
         return {name: field, description: "Example: 12 pages read"}
      case "Pages written":
         return {name: field, description: "Example: 12 pages written"}
      case "Pictures drawn":
         return {name: field, description: "Example: 12 pictures drawn"}
   }
}).parse(field);

