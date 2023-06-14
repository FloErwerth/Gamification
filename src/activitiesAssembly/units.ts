import {Stat, StatEnumLowercase, StatEnumType} from "./stats";
import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

export const Unit = ["meter", "km", "min/km", "km/h", "times", "bpm", "minutes", "hours", "seconds", "kCal"] as const;


export type Unit = typeof Unit[number] | StatEnumLowercase;

export const getDefaultStat = (stat?: StatEnumType): Stat => {
   switch (stat) {
      case "Duration":
         return {
            statName: stat,
            type: ActivityInputTypes.MINUTES,
            unit: "minutes"
         };
      case "Calories burned":
         return {statName: stat, type: ActivityInputTypes.NUMBER, unit: "kCal"};
      case "Pages read":
      case "Pages written":
      case "Pictures drawn":
      case "Steps":
      case "Songs played":
      case "Items learned":
      case "Laps":
      case "Goals":
      case "Sets":
         return {statName: stat, type: ActivityInputTypes.NUMBER, unit: stat.toLowerCase()}
      case "Done":
         return {statName: stat, type: ActivityInputTypes.NUMBER, unit: "times"}
      case "Distance":
         return {statName: stat, type: ActivityInputTypes.NUMBER, unit: "meter"}
      case "Speed":
         return {statName: stat, type: ActivityInputTypes.NUMBER, unit: "km/h"}
      case "Heart rate":
         return {statName: stat, type: ActivityInputTypes.NUMBER, unit: "bpm"}
      default:
         return {
            statName: "Duration",
            type: ActivityInputTypes.NUMBER,
            unit: "Duration".toLowerCase()
         }
   }
}

export const getTypeFromUnit = (unit: Unit): ActivityInputTypes | undefined => {
   switch (unit) {
      case "seconds":
         return ActivityInputTypes.SECONDS;

      case "minutes":
         return ActivityInputTypes.MINUTES;

      case "hours":
         return ActivityInputTypes.HOURS;
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
