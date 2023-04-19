import {getClasses} from "../../utils/styleUtils";
import {cellStyles, styles} from "./styles";
import {CellInfo, DateType} from "../../store/activities/types";
import {useCalendar} from "./useCalendar";
import {useMemo} from "react";
import {getDay, getDisplayMonth} from "./utils";
import {StatWithValue} from "../../store/activities/predefinedActivities";
import {Button} from "../Button/Button";

interface CalendarProps {
   onClick: (date: DateType, marked: boolean, stats: StatWithValue[], info?: string) => void;
}

interface CalendarCell extends CalendarProps {
   date: DateType,
   calendarObject: CellInfo
}


const CalendarCell = ({onClick, calendarObject, date}: CalendarCell) => {
   const cssClasses = useMemo(() => getClasses(cellStyles(calendarObject?.marked ?? false, calendarObject?.interactable ?? true)), [calendarObject, calendarObject?.marked]);
   return <button disabled={!calendarObject?.interactable && calendarObject?.interactable === false}
                  onClick={() => onClick(date, calendarObject.marked ?? false, calendarObject?.stats ?? [], calendarObject.info)}
                  className={cssClasses.calendarCell}>
      <div>{getDay(date)}</div>
   </button>;
}

const weekDays = ["Mo", "Tues", "Wed", "Thur", "Fr", "Sa", "So"];
const calendarClasses = getClasses(styles);

export const Calendar = ({onClick}: CalendarProps) => {
   const [currentCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, showCurrentMonth, shownDate] = useCalendar();
   return <div className={calendarClasses.mainWrapper}>
      <h2>{getDisplayMonth(shownDate.month)} {shownDate.year}</h2>
      <div className={calendarClasses.weekdaysWrapper}>{weekDays.map((weekday) => <div
         className={calendarClasses.weekday}>{weekday}</div>)}</div>
      <div className={calendarClasses.calendarWrapper}>
         {Object.keys(currentCalendar).map((date, index) => {
            const typedDate = date as DateType;
            return <CalendarCell
               date={typedDate} calendarObject={currentCalendar[typedDate]} onClick={onClick}/>
         })}
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