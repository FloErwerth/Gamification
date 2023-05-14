import {z} from "zod";

export const SportStat = z.enum(["Duration",
   "Distance",
   "Speed",
   "Heart rate",
   "Sets",
   "Calories burned",
   "Steps",
   "Laps",
   "Goals",
]);

export type SportStatType = z.infer<typeof SportStat>;
export const SportActivities = z.enum(["Running", "Streching", "Martial Arts", "Hiking", "Rowing"]);

export function SportsActivityAssembly<T>(statEnum: T) {
   const parse = SportActivities.transform((activity): SportStatType[] => {
      switch (activity) {
         case "Running":
            return [
               "Duration", "Speed", "Distance", "Calories burned", "Heart rate"
            ];
         case "Streching": {
            return ["Duration", "Sets"]
         }
         case "Martial Arts": {
            return ["Duration", "Calories burned"]
         }
         case "Rowing": {
            return ["Duration", "Calories burned", "Heart rate"]
         }
         case "Hiking": {
            return ["Distance", "Calories burned"]
         }
         default:
            return [];
      }
   }).safeParse(statEnum);

   if (parse.success) {
      return parse.data;
   }

   return [];
}