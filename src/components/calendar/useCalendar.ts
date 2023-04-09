import {useCallback, useEffect, useState} from "react";
import {Temporal} from "@js-temporal/polyfill";
import {useAppSelector} from "../../store/store";
import {getCreationDate} from "../../store/authentication/authSelectors";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {getCalendarEntries} from "../../store/activities/activitiesSelectors";
import {generateISOString} from "./utils";


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

const getDate = (day: number, year: number, month: number) => {
   return gregorian.dateFromFields({day, year, month}).toLocaleString();
}
const staticNumberOfDaysShownFromPreviousMonth = 2;

export const useCalendar = () => {
   const [shownDate, setShownDate] = useState(Temporal.Now.zonedDateTime(gregorian));
   const [currentCalendar, setCurrentCalendar] = useState<{ date: string, marked?: boolean, progress?: number, interactable?: boolean }[]>([]);
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
               calendar[i] = {
                  date: currentCalendar[i].date,
                  marked: false,
                  progress: undefined,
                  interactable: currentCalendar[i].interactable ?? undefined
               };
            }
         }
      }
      setCurrentCalendar(calendar);
   }, [calendarEntries])

   const constructCalendar = useCallback(() => {
      const calendar: { date: string, marked?: boolean, progress?: number, interactable?: boolean }[] = [];
      const totalDays = 35;
      const daysInCurrentMonth = gregorian.daysInMonth(shownDate);
      const daysFromNextMonth = totalDays - staticNumberOfDaysShownFromPreviousMonth - daysInCurrentMonth;
      const previousMonth = Temporal.PlainDate.from(shownDate).subtract({months: 1});
      const daysFromPreviousMonth = gregorian.daysInMonth(previousMonth);
      const nextMonth = Temporal.PlainDate.from(shownDate).add({months: 1});

      for (let previousMonthDay = daysFromPreviousMonth; previousMonthDay > daysFromPreviousMonth - staticNumberOfDaysShownFromPreviousMonth; previousMonthDay--) {
         const date = getDate(previousMonthDay, previousMonth.year, previousMonth.month);
         calendar.push({date, interactable: false});
      }
      for (let day = 1; day <= daysInCurrentMonth; day++) {
         const date = getDate(day, shownDate.year, shownDate.month);
         const entry = calendarEntries?.[generateISOString(date)];
         if (entry) {
            calendar.push({date, marked: entry.marked, progress: entry.progress});
         } else {
            calendar.push({date});
         }
      }
      for (let nextMonthDay = 1; nextMonthDay <= daysFromNextMonth; nextMonthDay++) {
         const date = getDate(nextMonthDay, nextMonth.year, nextMonth.month);
         calendar.push({date, interactable: false});
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