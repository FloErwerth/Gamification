import {style} from "../../utils/styleUtils";

export const cellStyles = (marked: boolean) => style({
   calendarCell: {
      all: "unset",
      padding: 5,
      borderRadius: 5,
      width: 75,
      backgroundColor: marked ? "lightcoral" : "",
      ":hover": {
         backgroundColor: "coral",
         cursor: "pointer",
      }
   }
})

export const styles = style({
   mainWrapper: {
      width: "fit-content",
      marginBlock: 30,
   },
   calendarWrapper: {
      outline: "2px solid lightcoral",
      display: "grid",
      borderRadius: 5,
      gap: 5,
      padding: 5,
      marginBlock: 5,
      gridTemplateColumns: "repeat(7, auto)",
   },
   calendarButtons: {
      display: "grid",
      height: 30,
      gap: 10,
      gridTemplateColumns: "repeat(3, auto)",
   },
})