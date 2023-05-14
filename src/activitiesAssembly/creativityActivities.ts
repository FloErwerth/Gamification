import {z} from "zod";
import {StatEnumType} from "./stats";


export const CreativityStat = z.enum(["Pictures drawn", "Songs played", "Pages written"]);
export const CreativityActivitiy = z.enum(["Writing", "Drawing", "Playing an instrument"]);

export function CreativityActivityAssembly<T>(statEnum: T) {
   const parse = CreativityActivitiy.transform((activity): StatEnumType[] => {
      switch (activity) {
         case "Writing":
            return ["Duration", "Pages written"]
         case "Playing an instrument": {
            return ["Duration", "Songs played"]
         }
         case "Drawing": {
            return ["Duration", "Pictures drawn"]
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