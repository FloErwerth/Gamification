import {getClasses} from "../../utils/styleUtils";
import {cellStyles, styles} from "./styles";
import {ActivityProps, CellInfo, DateType} from "../../store/activities/types";
import {useCalendar} from "./useCalendar";
import {useMemo} from "react";
import {getDay} from "./utils";
import {Button} from "../../basicComponents/Button/Button";
import {Stat} from "../../activitiesAssembly/stats";

interface CalendarProps {
   activity: ActivityProps,
   onClick: (date: DateType, marked: boolean, stats: Stat[], info?: string) => void;
}

interface CalendarCell extends Omit<CalendarProps, "activity"> {
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