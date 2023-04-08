import {Temporal} from "@js-temporal/polyfill";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../../store/store";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {getCreationDate} from "../../store/authentication/authSelectors";
import {DateType} from "../../store/activities/types";
import {getCalendarEntries} from "../../store/activities/activitiesSelectors";

const gregorian = Temporal.Calendar.from('gregory');

const getShowNextMonth = (month: number) => {
   return month !== Temporal.Now.plainDateISO().month
}

const getShowPreviousMonth = (month: number, creationDate: string) => {
   return month >= Temporal.Instant.fromEpochMilliseconds(Date.parse(creationDate)).toZonedDateTimeISO("UTC").month;
}

const getShowJump = (month: number) => {
   return month !== Temporal.Now.plainDateISO().month;
}

const generateISOString = (date: string): DateType => {
   return date.split(".").join("-") as DateType;
}


const useCalendar = () => {
   const [shownDate, setShownDate] = useState(Temporal.Now.zonedDateTime(gregorian));
   const [currentCalendar, setCurrentCalendar] = useState<{ date: string, marked?: boolean, progress?: number }[]>([]);
   const creationDate = useAppSelector(getCreationDate);
   const [showNextMonth, setShowNextMonth] = useState(getShowNextMonth(shownDate.month));
   const activtiyIndex = useAppSelector(getActiveActivity).index;
   const calendarEntries = useAppSelector(getCalendarEntries(activtiyIndex));
   const [showPreviousMonth, setShowPreviousMonth] = useState(getShowPreviousMonth(shownDate.month, creationDate));
   const [showJump, setShowJump] = useState(getShowJump(shownDate.month));

   useEffect(() => {
      const calendar = [...currentCalendar];
      for (let i = 0; i < currentCalendar.length; i++) {
         if (currentCalendar[i].date) {
            const currentEntry = calendarEntries[generateISOString(currentCalendar[i].date)];
            if (currentEntry) {
               calendar[i].marked = currentEntry.marked ?? false;
               calendar[i].progress = currentEntry.progress;
            } else {
               calendar[i] = {date: currentCalendar[i].date, marked: false, progress: undefined};
            }
         }
      }
      setCurrentCalendar(calendar);
   }, [calendarEntries])

   const constructCalendar = useCallback(() => {
      const calendar: { date: string, marked?: boolean, progress?: number }[] = [];
      const daysInMonth = gregorian.daysInMonth(shownDate);
      for (let day = 1; day <= daysInMonth; day++) {
         const date = gregorian.dateFromFields({
            day,
            year: shownDate.year,
            month: shownDate.month
         }).toLocaleString().toString();
         const entry = calendarEntries?.[generateISOString(date)];
         if (entry) {
            calendar.push({date, marked: entry.marked, progress: entry.progress});
         } else {
            calendar.push({date});
         }
      }
      return calendar;
   }, [shownDate])

   useEffect(() => {
      setShowPreviousMonth(getShowPreviousMonth(shownDate.month, creationDate));
      setShowNextMonth(getShowNextMonth(shownDate.month));
      setShowJump(getShowJump(shownDate.month));
      setCurrentCalendar(constructCalendar());
   }, [shownDate]);

   const decreaseMonth = useCallback(() => {
      const fold = shownDate.month - 1 === 0;
      const month = fold ? 12 : shownDate.month - 1;
      const year = fold ? shownDate.year - 1 : shownDate.year;
      setShowPreviousMonth(false);
      setShownDate(Temporal.ZonedDateTime.from(shownDate.with({month, year})));
   }, [shownDate]);

   const increaseMonth = useCallback(() => {
      const fold = shownDate.month + 1 > 12;
      const month = fold ? 1 : shownDate.month + 1;
      const year = fold ? shownDate.year + 1 : shownDate.year;
      setShowNextMonth(false);
      setShownDate(Temporal.ZonedDateTime.from(shownDate.with({month, year})));
   }, [shownDate]);

   const thisMonth = useCallback(() => {
      setShownDate(Temporal.Now.zonedDateTime(gregorian));
   }, []);

   return [currentCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, thisMonth] as const;
}

interface CalendarProps {
   onClick: (date: DateType, marked: boolean, progress?: number) => void;
}

const cssClasses = getClasses(styles);
export const Calendar = ({onClick}: CalendarProps) => {
   const [currentCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, thisMonth] = useCalendar();

   return <>
      <div className={cssClasses.calendarWrapper}>{currentCalendar.map((calendarObject, index) =>
         <button
            onClick={() => onClick(generateISOString(calendarObject.date), !calendarObject.marked, calendarObject.progress)}
            className={cssClasses.calendarCell}
            style={{backgroundColor: calendarObject.marked ? "green" : ""}}>
            <div>{calendarObject.date}</div>
            {calendarObject.progress && <div>{calendarObject.progress}</div>}</button>)}</div>
      {showPreviousMonth && <button onClick={decreaseMonth}>Previous Month</button>}
      {showJump && <button onClick={thisMonth}>Jump to current month</button>}
      {showNextMonth && <button onClick={increaseMonth}>Next Month</button>}
   </>
}