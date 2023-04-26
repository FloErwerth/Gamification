import {z} from "zod";
import {CreativityStatType} from "./creativityStat";
import {PredefinedActivities} from "../predefinedActivities";

export const CreativityActivitiy = z.enum(["Writing", "Reading"]);

export function CreativityActivityAssembly<T>(statEnum: T) {
   return PredefinedActivities.transform((activity): CreativityStatType[] => {
      switch (activity) {
         case "Writing":
            return ["Pages written"]
         case "Reading":
            return ["Pages read"]
         default:
            return [];
      }
   }).parse(statEnum);

}