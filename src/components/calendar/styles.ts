import {style} from "../../utils/styleUtils";

const getBackgroundColor = (marked: boolean, interactable: boolean, isCurrentDay: boolean) => {
   if (marked) {
      return interactable ? isCurrentDay ? "rgb(200,200,255)" : "lightcoral" : "rgb(220, 180, 180)";
   } else {
      return interactable ? isCurrentDay ? "lightblue" : "white" : "rgb(192,192,192)";
   }
}

export const cellStyles = (marked: boolean, interactable: boolean, isCurrentDay: boolean) => style({
   calendarCell: {
      all: "unset",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      padding: 5,
      borderRadius: 5,
      backgroundColor: getBackgroundColor(marked, interactable, isCurrentDay),
      outline: interactable ? "1px solid black" : "",
      color: interactable ? "black" : "rgb(180,180,180)",
      height: 60,
      ":hover": {
         backgroundColor: interactable ? "coral" : "",
         cursor: interactable ? "pointer" : "",
      }
   }
})

export const styles = style({
   mainWrapper: {
      marginInline: "auto",
      marginBlock: 50,
   },
   header: {
      marginBottom: 20,
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
      borderRadius: 5,
      gap: 5,
      padding: 10,
      marginBlock: 5,
      gridTemplateColumns: "repeat(7, 1fr)",
      textAlign: "left",
   },
   calendarButtons: {
      display: "grid",
      height: 30,
      gap: 10,
      gridTemplateColumns: "repeat(3, auto)",
   },
})