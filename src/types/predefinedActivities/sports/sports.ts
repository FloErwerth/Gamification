import {z} from "zod";
import {SportEnum} from "./sportEnum";

export const SportActivities = z.enum(["Aerobic", 'Athletics', 'Baseball', 'Basketball', 'Beach volleyball', 'Cheerleading', 'Cricket', 'Dance', 'Diving', 'Golf', 'Gymnastics', 'Handball', 'Hiking', 'Ice skating', 'Kayaking', 'Mountain biking', 'Pole dancing', 'Road cycling', 'Rowing', 'Rugby', 'Running', 'Skateboarding', 'Skiing', 'Snowboarding', 'Soccer', 'Surfing', 'Swimming', 'Tennis', 'Volleyball', 'Yoga']);

export const SportsActivityAssembly = SportActivities.transform((activity): SportEnum[] => {
   switch (activity) {

      case "Aerobic":
         return ["Time", "Calories burned", "Duration", "Sets", "Heart rate"];
      case "Athletics":
         return ["Time", "Calories burned", "Duration", "Best time", "Heart rate"];
      case "Baseball":
      case "Basketball":
      case "Beach volleyball":
      case "Cheerleading":
      case "Cricket":
         return ["Duration", "Distance", "Heart rate"]
      default:
         return [""];
   }
})