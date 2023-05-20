import {z} from "zod";
import {StatEnumType} from "./stats";

export const PersonalStat = z.enum(["Items learned", "Pages read", "Done"]);
export type PersonalStat = z.infer<typeof PersonalStat>;

export const PersonalActivities = z.enum(["Learning", "Reading", "Meditation", "Gardening"])
export type PersonalActivitiesType = z.infer<typeof PersonalActivities>;

export const PersonalActivityAssembly = <T>(activity: T) => {
   const parse = PersonalActivities.transform((activity): StatEnumType[] => {
      switch (activity) {
         case "Reading":
            return ["Pages read", "Duration"]
         case "Learning": {
            return ["Duration", "Items learned"]
         }
         case "Meditation": {
            return ["Duration"]
         }
         case "Gardening": {
            return ["Duration", "Calories burned"]
         }
         default:
            return []
      }
   }).safeParse(activity);

   if (parse.success) {
      return parse.data;
   }

   return [];
}