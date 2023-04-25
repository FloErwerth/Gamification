import {BookStat, StatWithValue} from "../../types/predefinedActivities";

export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: CellInfo };
export type CellInfo =
   { marked?: boolean, stats?: StatWithValue[], info?: string, interactable?: boolean };

export type ActivityProps = {
   stats: BookStat[];
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   calendarEntries: CalendarType;
};
