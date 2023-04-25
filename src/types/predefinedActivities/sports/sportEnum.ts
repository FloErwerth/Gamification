import {z} from "zod";

export const SportStat = z.enum(["Duration",
   "Distance",
   "Speed",
   "Heart rate",
   "Sets",
   "Calories burned",
   "Steps",
   "Laps",
]);

export type SportStatType = z.infer<typeof SportStat>;