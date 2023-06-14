import {Stat, StatEnumType} from "../../activitiesAssembly/stats";
import {
   Day,
   WeekInterval
} from "../../components/ActivityManipulator/ActivityManipulatorContext/ActivityManipulatorContext";

export type DateType = `${string}-${string}-${string}`;
export type CalendarType = { [date: DateType]: CellInfo };
export type CellInfo =
   { statValuePairs?: StatValuePair[], interactable?: boolean };
export type StatValuePair = { statName: StatEnumType, value: number }

export type ActivityProps = {
   stats: Stat[];
   activityName: string;
   daysToPerform: Day[];
   weeksToPerform: WeekInterval[];
   calendarEntries: CalendarType;
};
