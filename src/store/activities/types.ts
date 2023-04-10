import {z} from "zod";
import {CellInfo} from "../../components/OpenedActivity/OpenedActivity";

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


export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: Omit<CellInfo, "date"> };
export type StatsProps = {
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   type: ActivityType;
   increasement: ActivityIncrease;
   increasementFactor: number;
   calendarEntries: CalendarType;
};
