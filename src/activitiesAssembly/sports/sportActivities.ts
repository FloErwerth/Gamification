import {z} from "zod";
import {SportStatType} from "./sportEnum";
import {PredefinedActivities} from "../predefinedActivities";

export const SportActivities = z.enum(["Aerobic", 'Athletics', 'Baseball', 'Basketball', 'Beach volleyball', 'Cheerleading', 'Cricket', 'Dance', 'Diving', 'Golf', 'Gymnastics', 'Handball', 'Hiking', 'Ice skating', 'Kayaking', 'Mountain biking', 'Pole dancing', 'Road cycling', 'Rowing', 'Rugby', 'Running', 'Skateboarding', 'Skiing', 'Snowboarding', 'Soccer', 'Surfing', 'Swimming', 'Tennis', 'Volleyball', 'Yoga']);

export function SportsActivityAssembly<T>(statEnum: T) {
   const parse = PredefinedActivities.transform((activity): SportStatType[] => {
      switch (activity) {
         default:
            return ["Duration", "Calories burned"];
      }
   }).safeParse(statEnum);

   if (parse.success) {
      return parse.data;
   }

   return [];
}