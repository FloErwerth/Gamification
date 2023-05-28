import {Stat} from "../../activitiesAssembly/stats";
import {
   Day,
   WeekInterval
} from "../../components/ActivityManipulator/ActivityManipulatorContext/ActivityManipulatorContext";

export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: CellInfo };
export type CellInfo =
   { marked?: boolean, stats?: Stat[], info?: string, interactable?: boolean };

export type ActivityProps = {
   stats: Stat[];
   currentValue: number;
   maxValue: number;
   name: string;
   level: number;
   weekdays: Day[];
   weeklyInterval: WeekInterval[];
   calendarEntries: CalendarType;
};
