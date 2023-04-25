import {z} from "zod";
import {SportStat} from "./predefinedActivities/sports/sportEnum";
import {CreativityStat} from "./predefinedActivities/creativity/creativityStat";
import {SportActivities, SportsActivityAssembly} from "./predefinedActivities/sports/sportActivities";
import {CreativityActivitiy, CreativityActivityAssembly} from "./predefinedActivities/creativity/creativityActivities";

export const StatEnum = z.enum([...CreativityStat.options, ...SportStat.options]);
export const PredefinedActivities = z.enum([...SportActivities.options, ...CreativityActivitiy.options, "CUSTOM"]);
export type PredefinedActivities = z.infer<typeof PredefinedActivities>;
export type StatEnumType = z.infer<typeof StatEnum>;

export function ActivityAssembly<T extends StatEnumType>(statEnum: T): StatEnumType[] {
   return [
      ...CreativityActivityAssembly(statEnum),
      ...SportsActivityAssembly(statEnum),
   ]
}

export type StatWithValue = { name: StatEnumType, value: number };
export type Stat = { name: StatEnumType, preferedUnit: string, text: string, description: string };

export const StatMap = (field: StatEnumType) => StatEnum.transform((field): Stat => {
   switch (field) {
      case "Distance":
         return {name: field, preferedUnit: "km", text: "You covered a distance of", description: "Example: 12km"};
      case "Duration":
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
      case "Laps":
         return {name: field, preferedUnit: field, text: "You have made", description: "Example: You have made 4 Laps"}
      case "Speed":
         return {
            name: field,
            preferedUnit: "min/km",
            text: "Your speed was",
            description: "Example: Your speed was 6:43 min/km"
         }
      default:
         return {name: field, description: "", text: "", preferedUnit: ""}
   }
}).parse(field);

