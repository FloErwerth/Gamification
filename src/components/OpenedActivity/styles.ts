import {style} from "../../utils/styleUtils";

export const styles = style({
   wrapper: {
      display: "grid",
      gridTemplateRows: "30px 300px 30px",
      width: "400px",
      height: "400px",
      gap: 20,
      padding: 20
   },
   title: {
      fontWeight: "bold",
      display: "flex",
      fontSize: 20,
      gap: 5,
   },
   statsWrapper: {
      padding: 5,
   },
   buttons: {
      display: "grid",
      height: 30,
      gap: 10,
      gridTemplateColumns: "50% 50%",
   }
})