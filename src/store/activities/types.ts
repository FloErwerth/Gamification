import {CellInfo} from "../../components/OpenedActivity/OpenedActivity";
import {Stat} from "./predefinedActivities";

export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: Omit<CellInfo, "date"> };

export type ActivityProps = {
   stats: Stat[];
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   calendarEntries: CalendarType;
};
