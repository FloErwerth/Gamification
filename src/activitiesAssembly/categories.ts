import {z} from "zod";
import {SportStat} from "./sports/sportEnum";
import {CreativityStat} from "./creativity/creativityStat";
import {StatEnum} from "./stats";

export const ActivityCategory = z.enum(["Sports", "Creativity", "None"]);
export type TActivityCategory = z.infer<typeof ActivityCategory>;

export const MapCategoryToStats = (category: TActivityCategory) => z.enum(["Sports", "Creativity", "None"]).transform((category) => {
   switch (category) {
      case "Sports":
         return SportStat;
      case "Creativity":
         return CreativityStat;
      case "None":
         return StatEnum;
   }
}).parse(category);