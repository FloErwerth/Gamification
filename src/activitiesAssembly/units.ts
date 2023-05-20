import {Stat, StatEnumLowercase, StatEnumType} from "./stats";
import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

export const Unit = ["meter", "km", "min/km", "km/h", "times", "bpm", "minutes", "hours", "seconds", "kCal"] as const;


export type TimeFormat<T extends ActivityInputTypes> = T extends ActivityInputTypes.SECONDS ? "ss" : T extends ActivityInputTypes.MINUTES ? "mm:ss" : "hh:mm:ss";
export type Unit = typeof Unit[number] | StatEnumLowercase;

export type ActivityType<T extends ActivityInputTypes> = { input: ActivityInputTypes, format?: TimeFormat<T> }

export const getDefaultStat = (stat: StatEnumType): Stat => {
   switch (stat) {
      case "Duration":
         return {name: stat, type: {input: ActivityInputTypes.MINUTES, format: "mm:ss"}, preferedUnit: "minutes"};
      case "Calories burned":
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
   }
}
