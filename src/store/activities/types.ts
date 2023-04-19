import {StatEnum, StatWithValue} from "./predefinedActivities";

export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: Omit<CellInfo, "date"> };
export type CellInfo =
   { marked?: boolean, stats?: StatWithValue[], info?: string, interactable?: boolean };
export type ActivityProps = {
   stats: StatEnum[];
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   calendarEntries: CalendarType;
};
