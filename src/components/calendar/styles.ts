import {style} from "../../utils/styleUtils";

export const styles = style({
   calendarWrapper: {
      minHeight: 360,
      display: "grid",
      gap: 2,
      padding: 10,
      gridTemplateColumns: "repeat(7, auto)",
   },
   calendarCell: {
      all: "unset",
      padding: 5,
      borderRadius: 5,
      ":hover": {
         backgroundColor: "lightgreen",
         cursor: "pointer",
      }
   }
})