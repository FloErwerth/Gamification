import {Temporal} from "@js-temporal/polyfill";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getActiveActivity} from "../../store/activity/activitySelector";
import {updateActivityCalendarCell} from "../../store/activities/activitiesActions";
import {getCreationDate} from "../../store/authentication/authSelectors";
import {Date} from "../activity/types";

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

const useCalendar = () => {
   const [shownDate, setShownDate] = useState(Temporal.Now.zonedDateTime(gregorian));
   const [currentCalendar, setCurrentCalendar] = useState<{ date: string, marked: boolean }[]>([]);
   const creationDate = useAppSelector(getCreationDate);
   const [showNextMonth, setShowNextMonth] = useState(getShowNextMonth(shownDate.month));
   const [showPreviousMonth, setShowPreviousMonth] = useState(getShowPreviousMonth(shownDate.month, creationDate));
   const [showJump, setShowJump] = useState(getShowJump(shownDate.month));

   const constructCalendar = useCallback(() => {
      const calendar: { date: string, marked: boolean }[] = [];
      const daysInMonth = gregorian.daysInMonth(shownDate);
      for (let day = 1; day <= daysInMonth; day++) {
         const date = gregorian.dateFromFields({day, year: shownDate.year, month: shownDate.month});
         calendar.push({date: date.toLocaleString().toString(), marked: false});
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

const generateISOString = (date: string): Date => {
   return date.split(".").join("-") as Date;
}

const cssClasses = getClasses(styles);
export const Calendar = () => {
   const [currentCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, thisMonth] = useCalendar();
   const dispatch = useAppDispatch();
   const activeActivityIndex = useAppSelector(getActiveActivity).index;

   const handleClick = useCallback((cellIndex: number, marked: boolean, date: Date) => {
      dispatch(updateActivityCalendarCell({
         activityIndex: activeActivityIndex,
         date,
         marked: !marked,
      }));
   }, [activeActivityIndex])

   return <>
      <div className={cssClasses.calendarWrapper}>{currentCalendar.map((calendarObject, index) =>
         <button onClick={() => handleClick(index, calendarObject.marked, generateISOString(calendarObject.date))}
                 className={cssClasses.calendarCell}
                 style={{backgroundColor: calendarObject.marked ? "green" : ""}}>{calendarObject.date}</button>)}</div>
      {showPreviousMonth && <button onClick={decreaseMonth}>Previous Month</button>}
      {showJump && <button onClick={thisMonth}>Jump to current month</button>}
      {showNextMonth && <button onClick={increaseMonth}>Next Month</button>}
   </>
}