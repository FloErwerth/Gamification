import {z} from "zod";

export const PREDEFINED_STATS_SET = z.enum(["Custom", "Jogging"]);
export type PredefinedStatsSet = z.infer<typeof PREDEFINED_STATS_SET>;
export type Stat = { name: StatEnum, text: string, preferedUnit: string, description: string, value?: number, deletable?: boolean };
export const StatEnum = z.enum(["Distance", "Time", "Calories", "Steps", "Pages written", "Pages read", "Pictures drawn"]);
export type StatEnum = z.infer<typeof StatEnum>;

export const assambleFields = (statSet: PredefinedStatsSet): StatEnum[] => {
   switch (statSet) {
      case "Jogging":
         return ["Distance", "Time"];
      case "Custom":
         return [];
   }
}

export const StatMap = (field: StatEnum) => StatEnum.transform((field): Stat => {
   switch (field) {
      case "Distance":
         return {name: field, preferedUnit: "km", text: "You covered a distance of", description: "Example: 12km"};
      case "Time":
         return {
            name: field,
            preferedUnit: "Minutes",
            text: "It took",
            description: "Example: 38 minutes"
         };
      case "Calories":
         return {
            name: field,
            preferedUnit: "kcal",
            text: "You burned",
            description: "Example: 365 calories burnt"
         };
      case "Steps": {
         return {
            name: field,
            preferedUnit: "steps",
            text: "You did",
            description: "Example: 10532 steps"
         }
      }
      case "Pages read":
         return {name: field, preferedUnit: "pages", text: "You read", description: "Example: 12 pages read"}
      case "Pages written":
         return {name: field, preferedUnit: "pages", text: "You wrote", description: "Example: 12 pages written"}
      case "Pictures drawn":
         return {name: field, preferedUnit: "pictures", text: "You drew", description: "Example: 12 pictures drawn"}
   }
}).parse(field);

