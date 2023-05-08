import {z} from "zod";
import {CreativityStat} from "./creativity/creativityStat";
import {SportStat} from "./sports/sportEnum";
import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

export const StatEnum = z.enum([...CreativityStat.options, ...SportStat.options]);
export type StatEnumType = z.infer<typeof StatEnum>;

export type StatWithValue = { name: StatEnumType, value: number, type?: ActivityInputTypes };
export type Stat = { name: StatEnumType, preferedUnit: string, type?: ActivityInputTypes };

export const StatMap = (field: StatEnumType) => StatEnum.transform((field): Stat => {
   switch (field) {
      case "Distance":
         return {name: field, preferedUnit: "km", type: ActivityInputTypes.NUMBER};
      case "Duration":
         return {
            name: field,
            preferedUnit: "Minutes",
            type: ActivityInputTypes.MINUTES
         };
      case "Calories burned":
         return {
            name: field,
            preferedUnit: "kCal",
            type: ActivityInputTypes.NUMBER,
         };
      case "Heart rate":
         return {name: field, preferedUnit: "bpm", type: ActivityInputTypes.NUMBER}
      case "Steps": {
         return {
            name: field,
            preferedUnit: "steps",
            type: ActivityInputTypes.NUMBER,
         }
      }
      case "Pages read":
         return {
            name: field, preferedUnit: "pages",
            type: ActivityInputTypes.NUMBER,
         }
      case "Pages written":
         return {
            name: field, preferedUnit: "pages",
            type: ActivityInputTypes.NUMBER
         }
      case "Pictures drawn":
         return {
            name: field, preferedUnit: "pictures",
            type: ActivityInputTypes.NUMBER
         }
      case "Laps":
         return {
            name: field, preferedUnit: field,
            type: ActivityInputTypes.NUMBER
         }
      case "Speed":
         return {
            name: field,
            preferedUnit: "min/km",
            type: ActivityInputTypes.MINUTES,
         }
      case "Sets":
         return {name: field, preferedUnit: field, type: ActivityInputTypes.NUMBER}
      default:
         return {name: field, preferedUnit: ""}
   }
}).parse(field);
