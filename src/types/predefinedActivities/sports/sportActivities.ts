import {z} from "zod";
import {SportStatType} from "./sportEnum";
import {PredefinedActivities} from "../../predefinedActivities";

export const SportActivities = z.enum(["Aerobic", 'Athletics', 'Baseball', 'Basketball', 'Beach volleyball', 'Cheerleading', 'Cricket', 'Dance', 'Diving', 'Golf', 'Gymnastics', 'Handball', 'Hiking', 'Ice skating', 'Kayaking', 'Mountain biking', 'Pole dancing', 'Road cycling', 'Rowing', 'Rugby', 'Running', 'Skateboarding', 'Skiing', 'Snowboarding', 'Soccer', 'Surfing', 'Swimming', 'Tennis', 'Volleyball', 'Yoga']);

export const SportsActivityAssembly = (statEnum: PredefinedActivities) => PredefinedActivities.transform((activity): SportStatType[] => {
   switch (activity) {
      case "Aerobic":
         return ["Time", "Calories burned"];
      case "Athletics":
         return ["Time", "Calories burned"];
      case "Baseball":
      case "Basketball":
      case "Beach volleyball":
      case "Cheerleading":
      case "Cricket":
         return ["Time"]
      default:
         return ["Time", "Calories burned"];
   }
}).parse(statEnum);