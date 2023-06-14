import {getClasses} from "../../utils/styleUtils";
import {cellStyles, styles} from "./styles";
import {CellInfo, DateType} from "../../store/activities/types";
import {useCalendar} from "./useCalendar";
import {useMemo} from "react";
import {getDay} from "./utils";
import {Button} from "../../basicComponents/Button/Button";
import {Temporal} from "@js-temporal/polyfill";

interface CalendarProps {
   onClick: (date: DateType) => void;
}

interface CalendarCell extends Omit<CalendarProps, "activity"> {
   date: DateType,
   calendarObject: CellInfo
}

const currentDay = Temporal.Now.plainDate("gregory");
const isEqualDay = (date1: Temporal.PlainDate, date2: Temporal.PlainDate) => {
   return date1.day === date2.day && date1.month === date2.month && date1.year === date2.year;
}
const CalendarCell = ({onClick, calendarObject, date}: CalendarCell) => {
   const isCurrentDay = useMemo(() => isEqualDay(currentDay, Temporal.PlainDate.from(date)), [date]);
   const cssClasses = useMemo(() => getClasses(cellStyles(Boolean(calendarObject.statValuePairs) ?? false, calendarObject?.interactable ?? true, isCurrentDay)), [calendarObject, isCurrentDay]);

   return <button disabled={!calendarObject?.interactable && calendarObject?.interactable === false}
                  onClick={() => onClick(date)}
                  className={cssClasses.calendarCell}>
      {getDay(date)}
   </button>;
}

const calendarClasses = getClasses(styles);
export const Calendar = ({onClick}: CalendarProps) => {
   const [currentCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, showCurrentMonth, dayLabels] = useCalendar();

   return <div className={calendarClasses.mainWrapper}>
      <div className={calendarClasses.calendarWrapper}>
         <>{dayLabels.map((label) => <div key={label}
                                          className={calendarClasses.weekday}>{label}</div>)}
            {Object.keys(currentCalendar).map((date) => {
               const typedDate = date as DateType;
               return <CalendarCell key={date}
                                    date={typedDate} calendarObject={currentCalendar[typedDate]} onClick={onClick}/>
            })}</>
      </div>

      <div className={calendarClasses.calendarButtons}><Button
         disabled={!showPreviousMonth} onClick={decreaseMonth}>Previous
         Month</Button>
         <Button disabled={!showJump} onClick={showCurrentMonth}>Jump to current
            month</Button>
         <Button disabled={!showNextMonth} onClick={increaseMonth}>Next
            Month</Button></div>
      <small style={{marginBottom: 10}}>Click on a date to make progress</small>
   </div>

}