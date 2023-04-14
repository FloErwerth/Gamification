import {z} from "zod";

export const StatisticsFilter = z.enum(["Overall", "Year", "Month", "Day"]);
export type StatisticsFilter = z.infer<typeof StatisticsFilter>
