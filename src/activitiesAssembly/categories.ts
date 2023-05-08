import {z} from "zod";
import {SportStat} from "./sports/sportEnum";
import {CreativityStat} from "./creativity/creativityStat";
import {StatEnum} from "./stats";

export const ActivityCategory = z.enum(["Sports", "Creativity", "All"]);
export type TActivityCategory = z.infer<typeof ActivityCategory>;

export const MapCategoryToStats = (category: string) => {
   const parse = ActivityCategory.transform((category) => {
      switch (category) {
         case "Sports":
            return SportStat;
         case "Creativity":
            return CreativityStat;
         case "All":
            return StatEnum;
      }
   }).safeParse(category);

   if (parse.success) {
      return parse.data;
   }
   return StatEnum
}