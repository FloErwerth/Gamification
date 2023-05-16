import {style} from "../../utils/styleUtils";

export const styles = style({
   wrapper: {
      display: "grid",
      padding: 20,
      width: 500,
      gap: 20,
      gridTemplateRows: "30px 440px 30px",
      flexDirection: "column",
   },
   fields: {
      paddingTop: 20,
      display: "flex",
      flexDirection: "column",
      width: "50%",
      gap: 10,
   },
   buttons: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
   }
})