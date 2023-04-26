import {StatEnumType, StatWithValue} from "../../activitiesAssembly/stats";

export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: CellInfo };
export type CellInfo =
   { marked?: boolean, stats?: StatWithValue[], info?: string, interactable?: boolean };

export type ActivityProps = {
   stats: StatEnumType[];
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   calendarEntries: CalendarType;
};
