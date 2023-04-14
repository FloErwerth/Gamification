import {style} from "../../utils/styleUtils";

const getBackgroundColor = (marked: boolean, interactable: boolean) => {
   if (marked) {
      return interactable ? "lightcoral" : "rgb(220, 180, 180)";
   } else {
      return interactable ? "" : "rgb(232,232,232)";
   }
}

export const cellStyles = (marked: boolean, interactable: boolean) => style({
   calendarCell: {
      all: "unset",
      padding: 5,
      borderRadius: 5,
      textAlign: "left",
      backgroundColor: getBackgroundColor(marked, interactable),
      color: interactable ? "black" : "rgb(200,200,200)",
      ":hover": {
         backgroundColor: interactable ? "coral" : "",
         cursor: interactable ? "pointer" : "",
      }
   }
})

export const styles = style({
   mainWrapper: {
      width: "fit-content",
      margin: "auto",
   },
   weekdaysWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 60px)",
      gap: 5,
   },
   weekday: {
      paddingInline: 15,
   },
   calendarWrapper: {
      display: "grid",
      outline: "1px solid black",
      borderRadius: 5,
      gap: 5,
      padding: 10,
      marginBlock: 5,
      gridTemplateColumns: "repeat(7, 60px)",
      gridTemplateRows: "repeat(6, 30px)",
      textAlign: "left",
   },
   calendarButtons: {
      display: "grid",
      height: 30,
      gap: 10,
      gridTemplateColumns: "repeat(3, auto)",
   },
})