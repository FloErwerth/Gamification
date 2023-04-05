import {z} from "zod";

export const ACTIVITY_TYPE = z.enum([
   "Minutes",
   "Hours",
   "Days",
   "Pages",
   "Times",
   "UNDEFINED"]);

export const ACTIVITY_INCREASE_TYPES = z.enum([
   "Linear", "Quadratic", "Factor", "UNDEFINED"
])

export type ActivityType = z.infer<typeof ACTIVITY_TYPE>;
export type ActivityIncrease = z.infer<typeof ACTIVITY_INCREASE_TYPES>;