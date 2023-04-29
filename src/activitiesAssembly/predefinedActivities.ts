import {z} from "zod";
import {SportActivities} from "./sports/sportActivities";
import {CreativityActivitiy} from "./creativity/creativityActivities";


export const PredefinedActivities = z.enum(["Custom", ...SportActivities.options, ...CreativityActivitiy.options]);
export type PredefinedActivities = z.infer<typeof PredefinedActivities>;

