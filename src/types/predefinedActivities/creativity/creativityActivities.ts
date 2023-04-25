import {z} from "zod";
import {CreativityEnumType} from "./creativityStat";
import {PredefinedActivities} from "../../predefinedActivities";

export const CreativityActivitiy = z.enum(["Writing", "Reading"]);
export const CreativityActivityAssembly = (statEnum: PredefinedActivities) => PredefinedActivities.transform((activity): CreativityEnumType[] => {
   switch (activity) {
      case "Writing":
         return ["Pages written"]
      case "Reading":
         return ["Pages read"]
      default:
         return [];
   }
}).parse(statEnum);