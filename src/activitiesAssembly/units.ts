import {Stat, StatEnumLowercase, StatEnumType} from "./stats";
import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

export const Unit = ["meter", "km", "min/km", "km/h", "times", "bpm", "minutes", "hours", "seconds", "kCal"] as const;


export type TimeFormat<T extends ActivityInputTypes> = T extends ActivityInputTypes.SECONDS ? "ss" : T extends ActivityInputTypes.MINUTES ? "mm:ss" : "hh:mm:ss";
export type Unit = typeof Unit[number] | StatEnumLowercase;

export type ActivityType = { input: ActivityInputTypes, format?: TimeFormat<ActivityInputTypes> }

export const getDefaultStat = (stat?: StatEnumType): Stat => {
   switch (stat) {
      case "Duration":
         return {name: stat, type: {input: ActivityInputTypes.MINUTES, format: "mm:ss"}, preferedUnit: "minutes"};
      case "Calories burned":
         return {name: stat, type: {input: ActivityInputTypes.NUMBER}, preferedUnit: "kCal"};
      case "Pages read":
      case "Pages written":
      case "Pictures drawn":
      case "Steps":
      case "Songs played":
      case "Items learned":
      case "Laps":
      case "Goals":
      case "Sets":
         return {name: stat, type: {input: ActivityInputTypes.NUMBER}, preferedUnit: stat.toLowerCase()}
      case "Done":
         return {name: stat, type: {input: ActivityInputTypes.NUMBER}, preferedUnit: "times"}
      case "Distance":
         return {name: stat, type: {input: ActivityInputTypes.NUMBER}, preferedUnit: "meter"}
      case "Speed":
         return {name: stat, type: {input: ActivityInputTypes.NUMBER}, preferedUnit: "km/h"}
      case "Heart rate":
         return {name: stat, type: {input: ActivityInputTypes.NUMBER}, preferedUnit: "bpm"}
      default:
         return {name: "Duration", type: {input: ActivityInputTypes.NUMBER}, preferedUnit: "Duration".toLowerCase()}
   }
}

export const getTypeFromUnit = (unit: Unit): ActivityType | undefined => {
   switch (unit) {
      case "seconds":
         return {
            input: ActivityInputTypes.SECONDS,
            format: "ss",
         }
      case "minutes":
         return {
            input: ActivityInputTypes.MINUTES,
            format: "mm:ss",
         }
      case "hours":
         return {
            input: ActivityInputTypes.HOURS,
            format: "hh:mm:ss",
         }
      default:
         return undefined
   }
}

export const getUnitOptions = (stat?: StatEnumType): Unit[] | undefined => {
   switch (stat) {
      case "Duration":
         return ["seconds", "minutes", "hours"];
      case "Distance":
         return ["meter", "km"];
      case "Speed":
         return ["km/h", "min/km"];
      default:
         return undefined;
   }
}
