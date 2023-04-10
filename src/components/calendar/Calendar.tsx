import {getClasses} from "../../utils/styleUtils";
import {cellStyles, styles} from "./styles";
import {DateType} from "../../store/activities/types";
import {useCalendar} from "./useCalendar";
import {useMemo} from "react";
import {Button} from "../basicComponents/Button/Button";
import {CellInfo} from "../OpenedActivity/OpenedActivity";

interface CalendarProps {
   onClick: (date: DateType, marked: boolean, progress?: number, info?: string) => void;
}

interface CalendarCell extends CalendarProps {
   calendarObject: CellInfo
}

const CalendarCell = ({onClick, calendarObject}: CalendarCell) => {
   const cssClasses = useMemo(() => getClasses(cellStyles(calendarObject?.marked ?? false, calendarObject?.interactable ?? true)), [calendarObject, calendarObject?.marked]);
   return <button disabled={!calendarObject?.interactable && calendarObject?.interactable === false}
                  onClick={() => onClick(calendarObject.date, calendarObject?.marked ?? false, calendarObject?.progress, calendarObject.info)}
                  className={cssClasses.calendarCell}>
      <div>{calendarObject?.date}</div>
   </button>;
}

const calendarClasses = getClasses(styles);
export const Calendar = ({onClick}: CalendarProps) => {
   const [currentCalendar, showPreviousMonth, showNextMonth, showJump, decreaseMonth, increaseMonth, thisMonth] = useCalendar();

   return <div className={calendarClasses.mainWrapper}>
      <div className={calendarClasses.calendarWrapper}>{currentCalendar.map((calendarObject) => {
         return <CalendarCell
            calendarObject={calendarObject} onClick={onClick}/>
      })}
      </div>
      <div className={calendarClasses.calendarButtons}><Button
         disabled={!showPreviousMonth} onClick={decreaseMonth}>Previous
         Month</Button>
         <Button disabled={!showJump} onClick={thisMonth}>Jump to current
            month</Button>
         <Button disabled={!showNextMonth} onClick={increaseMonth}>Next
            Month</Button></div>
   </div>

}