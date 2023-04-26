import {z} from "zod";
import {SportActivities} from "./sports/sportActivities";
import {CreativityActivitiy} from "./creativity/creativityActivities";


export const PredefinedActivities = z.enum([...SportActivities.options, ...CreativityActivitiy.options, "CUSTOM"]);
export type PredefinedActivities = z.infer<typeof PredefinedActivities>;

