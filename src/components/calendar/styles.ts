import {style} from "../../utils/styleUtils";

export const cellStyles = (marked: boolean, interactable: boolean) => style({
   calendarCell: {
      all: "unset",
      padding: 5,
      borderRadius: 5,
      height: "clamp(1vw, 1.5vw, 2vw)",
      textAlign: "center",
      backgroundColor: marked ? "lightcoral" : interactable ? "" : "rgb(232,232,232)",
      color: interactable ? "black" : "rgb(200,200,200)",
      ":hover": {
         backgroundColor: interactable ? "coral" : "",
         cursor: interactable ? "pointer" : "",
      }
   }
})

export const styles = style({
   mainWrapper: {
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