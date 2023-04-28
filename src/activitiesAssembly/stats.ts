import {z} from "zod";
import {CreativityStat} from "./creativity/creativityStat";
import {SportStat} from "./sports/sportEnum";

export const StatEnum = z.enum([...CreativityStat.options, ...SportStat.options]);
export type StatEnumType = z.infer<typeof StatEnum>;

export type StatWithValue = { name: StatEnumType, value: number };
export type Stat = { name: StatEnumType, preferedUnit: string };

export const StatMap = (field: StatEnumType) => StatEnum.transform((field): Stat => {
   switch (field) {
      case "Distance":
         return {name: field, preferedUnit: "km"};
      case "Duration":
         return {
            name: field,
            preferedUnit: "Minutes",
         };
      case "Calories burned":
         return {
            name: field,
            preferedUnit: "kCal",

         };
      case "Heart rate":
         return {name: field, preferedUnit: "bpm"}
      case "Steps": {
         return {
            name: field,
            preferedUnit: "steps",
         }
      }
      case "Pages read":
         return {name: field, preferedUnit: "pages"}
      case "Pages written":
         return {name: field, preferedUnit: "pages"}
      case "Pictures drawn":
         return {name: field, preferedUnit: "pictures"}
      case "Laps":
         return {name: field, preferedUnit: field}
      case "Speed":
         return {
            name: field,
            preferedUnit: "min/km",
         }
      case "Sets":
         return {name: field, preferedUnit: field,}
      default:
         return {name: field, preferedUnit: ""}
   }
}).parse(field);
