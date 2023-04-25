import {z} from "zod";
import {SportStatType} from "./sportEnum";
import {PredefinedActivities} from "../../predefinedActivities";

export const SportActivities = z.enum(["Aerobic", 'Athletics', 'Baseball', 'Basketball', 'Beach volleyball', 'Cheerleading', 'Cricket', 'Dance', 'Diving', 'Golf', 'Gymnastics', 'Handball', 'Hiking', 'Ice skating', 'Kayaking', 'Mountain biking', 'Pole dancing', 'Road cycling', 'Rowing', 'Rugby', 'Running', 'Skateboarding', 'Skiing', 'Snowboarding', 'Soccer', 'Surfing', 'Swimming', 'Tennis', 'Volleyball', 'Yoga']);

export function SportsActivityAssembly<T>(statEnum: T) {
   return PredefinedActivities.transform((activity): SportStatType[] => {
      switch (activity) {
         default:
            return ["Duration", "Calories burned"];
      }
   }).parse(statEnum)
}