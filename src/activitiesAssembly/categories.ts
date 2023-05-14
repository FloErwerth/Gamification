import {z} from "zod";
import {StatEnum} from "./stats";
import {PersonalActivities, PersonalStat} from "./personalActivities";
import {SportActivities, SportStat} from "./sportActivities";
import {CreativityActivitiy, CreativityStat} from "./creativityActivities";
import {PredefinedActivities} from "./predefinedActivities";

export const ActivityCategory = z.enum(["Sports", "Creativity", "Personal", "All"]);
export type TActivityCategory = z.infer<typeof ActivityCategory>;

export const getCategory = (option: PredefinedActivities) => {
   if (Array.from<string>(SportActivities.options).includes(option)) {
      return "Sports"
   }
   if (Array.from<string>(PersonalActivities.options).includes(option)) {
      return "Personal"
   }
   if (Array.from<string>(CreativityActivitiy.options).includes(option)) {
      return "Creativity"
   }
   return "All";
}
export const MapCategoryToStats = (category: string) => {
   const parse = ActivityCategory.transform((category) => {
      switch (category) {
         case "Sports":
            return SportStat;
         case "Creativity":
            return CreativityStat;
         case "Personal":
            return PersonalStat
         case "All":
            return StatEnum;
      }
   }).safeParse(category);

   if (parse.success) {
      return parse.data;
   }
   return StatEnum
}