import {style} from "../../../../utils/styleUtils";

export const styles = style({
   wrapper: {
      display: "grid",
      width: 500,
      gap: 20,
      gridTemplateRows: "auto auto auto ",
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