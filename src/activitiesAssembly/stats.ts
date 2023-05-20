import {z} from "zod";
import {CreativityStat} from "./creativityActivities";
import {SportStat} from "./sportActivities";
import {PersonalStat} from "./personalActivities";
import {ActivityType, getDefaultStat, Unit} from "./units";
import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

export const StatEnum = z.enum([...CreativityStat.options, ...SportStat.options, ...PersonalStat.options]);
export type StatEnumType = z.infer<typeof StatEnum>;

const StatToLowerCase = StatEnum.transform((stat) => stat.toLowerCase());
export type StatEnumLowercase = z.infer<typeof StatToLowerCase>;

export type StatWithValue = { name: StatEnumType, value: number };
export type Stat = { name: StatEnumType, preferedUnit: Unit, type: ActivityType<ActivityInputTypes> };

export const getDefaultStats = (stats: StatEnumType[]) => {
   return stats.map((stat) => {
      return getDefaultStat(stat)
   })
}
