import {z} from "zod";
import {SportEnum} from "./predefinedActivities/sports/sportEnum";

export type BookEnumType = z.infer<typeof BookStat>;
export const BookStat = z.enum(["Pages written", "Pages read"]);
export const StatEnum = z.union([BookStat, SportEnum]);
type StatEnumType = z.infer<typeof StatEnum>;
export type StatWithValue = { name: BookEnumType, value: number };

export type Stat = { name: StatEnumType, preferedUnit: string, text: string, description: string };

export const StatMap = (field: StatEnumType) => StatEnum.transform((field): Stat => {
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
      case "Calories burned":
         return {
            name: field,
            preferedUnit: "kCal",
            text: "You burned",
            description: "Example: 365 calories burnt"
         };
      case "Heart rate":
         return {name: field, preferedUnit: "bpm", text: "Your", description: "Example: Your Heart rate was 180 bpm"}
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

