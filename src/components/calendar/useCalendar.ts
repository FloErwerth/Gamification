import {useCallback, useEffect, useState} from "react";
import {Temporal} from "@js-temporal/polyfill";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getCreationDate} from "../../store/authentication/authSelectors";
import {getActiveActivity} from "../../store/activeActivity/activitySelector";
import {getCalendarEntries} from "../../store/activities/activitiesSelectors";
import {generateISOString} from "./utils";
import {CalendarType, DateType} from "../../store/activities/types";
import {setCurrentlySelectedMonth, setDaysInMonth} from "../../store/calendar/calendarActions";
import {Day, WeekInterval} from "../ActivityAdder/ActivityAdderContext/ActivityAdderContext";


const gregorian = Temporal.Calendar.from('gregory');

const getShowNextMonth = (month: number) => {
   return month !== Temporal.Now.plainDateISO().month
}

const getShowPreviousMonth = (month: number, creationDate: DateType) => {
   return month >= Temporal.Instant.fromEpochMilliseconds(Date.parse(creationDate)).toZonedDateTimeISO("UTC").month;
}

const getShowJump = (month: number) => {
   return month !== Temporal.Now.plainDateISO().month;
}

const getDate = (day: number, year: number, month: number) => {
   return generateISOString(gregorian.dateFromFields({day, year, month}).toLocaleString("de"));
}

const getWeeksInMonth = (weekInterval: WeekInterval[]): number[] => {
   const getWeek = (weekInterval: WeekInterval) => {
      switch (weekInterval) {
         case "First week": {
            return 1;
         }
         case "Second week": {
            return 2;
         }
         case "Third week": {
            return 3;
         }
         case "Fourth week": {
            return 4;
         }
         default:
            return 0;

      }
   }
   return weekInterval.map((week) => getWeek(week));
}

const getDaysInWeek = (days: Day[]): number[] => {
   const getDay = (day: Day) => {
      switch (day) {
         case "Monday":
            return 1;
         case "Tuesday":
            return 2;
         case "Wednesday":
            return 3;
         case "Thursday":
            return 4;
         case "Friday":
            return 5;
         case "Saturday":
            return 6;
         case "Sunday":
            return 7;
         default:
            return 0;
      }
   }
   return days.map((day) => getDay(day));

}

function getDates(date: Temporal.ZonedDateTime) {
   let day = 1;
   const daysInMonth = gregorian.daysInMonth(date);
   const singleDays = Array(daysInMonth).fill(0).map(() => day++);
   return singleDays.map((day) => getDate(day, date.year, date.month));
}

function getClampedDays(date: Temporal.ZonedDateTime, startIndex: number, numberOfDates: number) {
   return getDates(date).slice(startIndex, startIndex + numberOfDates);
}

export const useCalendar = () => {
   const [shownDate, setShownDate] = useState(Temporal.Now.zonedDateTime(gregorian));
   const [producedCalendar, setProducedCalendar] = useState<CalendarType>({});
   const creationDate = useAppSelector(getCreationDate);
   const [showNextMonth, setShowNextMonth] = useState(getShowNextMonth(shownDate.month));
   const activity = useAppSelector(getActiveActivity);
   const calendarEntries = useAppSelector(getCalendarEntries(activity.index));
   const [showPreviousMonth, setShowPreviousMonth] = useState(getShowPreviousMonth(shownDate.month, creationDate));
   const [showJump, setShowJump] = useState(getShowJump(shownDate.month));
   const dispatch = useAppDispatch();

   const constructCalendar = useCallback(() => {
      const calendar: CalendarType = {};
      const daysInCurrentMonth = gregorian.daysInMonth(shownDate);
      const previousMonth = Temporal.ZonedDateTime.from(shownDate).subtract({months: 1});
      const nextMonth = Temporal.ZonedDateTime.from(shownDate).add({months: 1});
      const spaceInCalendar = 42;
      const fillableSpace = spaceInCalendar - daysInCurrentMonth;
      const numberDatesInFront = shownDate.with({day: 1}).dayOfWeek - 1;
      const numberDatesInBack = fillableSpace - numberDatesInFront >= 7 ? fillableSpace - numberDatesInFront - 7 : fillableSpace - numberDatesInFront;
      const startDayIndex = gregorian.daysInMonth(previousMonth) - numberDatesInFront;
      const dates = getClampedDays(previousMonth, startDayIndex, numberDatesInFront).concat(getDates(shownDate)).concat(getClampedDays(nextMonth, 0, numberDatesInBack));
      const daysInWeek = getDaysInWeek(activity.activity.weekdays);
      const weeksInMonth = getWeeksInMonth(activity.activity.weeklyInterval);
      for (let i = 0; i < dates.length; i++) {
         const temporalDate = Temporal.PlainDate.from(dates[i]);
         const _weekInMonth = Math.ceil(temporalDate.day / 7);
         const weekInMonth = _weekInMonth === 5 ? 1 : _weekInMonth;
         const existentCellInfos = calendarEntries[dates[i]];
         const frontDisabled = i >= numberDatesInFront;
         const appendDisabled = i < dates.length - numberDatesInBack;
         const interactable = frontDisabled && appendDisabled && daysInWeek.includes(temporalDate.dayOfWeek) && weeksInMonth.includes(weekInMonth);
         if (existentCellInfos) {
            calendar[dates[i]] = {...existentCellInfos, interactable};
         } else {
            calendar[dates[i]] = {
               marked: false,
               interactable,
            }
         }
      }
      setProducedCalendar(calendar);
   }, [shownDate, calendarEntries])

   useEffect(() => {
      constructCalendar();
   }, [calendarEntries])

   useEffect(() => {
      dispatch(setDaysInMonth({daysInMonth: shownDate.daysInMonth}));
      dispatch(setCurrentlySelectedMonth({month: shownDate.month}))
      setShowPreviousMonth(getShowPreviousMonth(shownDate.month, creationDate));
      setShowNextMonth(getShowNextMonth(shownDate.month));
      setShowJump(getShowJump(shownDate.month));
      constructCalendar();
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

   return [producedCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, thisMonth, shownDate] as const;
}