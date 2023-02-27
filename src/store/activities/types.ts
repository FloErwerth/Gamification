import {z} from "zod";

export const ACTIVITY_TYPE = z.enum([
   "Minutes",
   "Hours",
   "Days",
   "Pages",
   "Times",
   "UNDEFINED"]);
export type ActivityType = z.infer<typeof ACTIVITY_TYPE>;