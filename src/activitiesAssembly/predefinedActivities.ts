import {z} from "zod";
import {CreativityActivitiy} from "./creativityActivities";
import {SportActivities} from "./sportActivities";
import {PersonalActivities} from "./personalActivities";


export const PredefinedActivities = z.enum([...SportActivities.options, ...CreativityActivitiy.options, ...PersonalActivities.options]);
export type PredefinedActivities = z.infer<typeof PredefinedActivities> | string;

